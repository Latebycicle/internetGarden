<script setup>
// Import necessary Vue composition API functions
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Reference to the DOM element
const nekoEl = ref(null);
// Initial position of the cat
let nekoPosX = 32;
let nekoPosY = 32;
// Track the current mouse position
let mousePosX = 0;
let mousePosY = 0;
// Counter for animation frames
let frameCount = 0;
// Counter for tracking how long the cat has been idle
let idleTime = 0;
// Current idle animation type (if any)
let idleAnimation = null;
// Current frame in the idle animation sequence
let idleAnimationFrame = 0;
// Whether the cat is forced to sleep (toggled by double-click)
let forceSleep = false;
// Whether the cat is currently being dragged
let grabbing = false;
// Whether the grab movement has stopped
let grabStop = true;
// Whether the cat has been nudged (for waking from sleep)
let nudge = false;
// Interval reference for the animation loop
let onekoInterval = null;

// Sprite sets for oneko animation - coordinates for background-position
// Each entry contains [x, y] coordinates that will be multiplied by 32px to get the actual position
// in the sprite sheet
const spriteSets = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  // Direction sprites (N = North, E = East, etc.)
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
};

// Filter sprite sets with more than one frame (used for animations)
const keys = Object.keys(spriteSets).filter((key) => spriteSets[key].length > 1);
const usedKeys = new Set();
// Movement speed of the cat
const nekoSpeed = 10;

/**
 * Get sprite coordinates for a specific animation and frame
 * Uses modulo to loop through animations with multiple frames
 */
function getSprite(name, frame) {
  return spriteSets[name][frame % spriteSets[name].length];
}

/**
 * Set the sprite by changing the background position of the element
 * Each sprite is 32x32 pixels in the sprite sheet
 */
function setSprite(name, frame) {
  if (!nekoEl.value) return;
  const sprite = getSprite(name, frame);
  nekoEl.value.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
}

/**
 * Reset idle animation state
 */
function resetIdleAnimation() {
  idleAnimation = null;
  idleAnimationFrame = 0;
}

/**
 * Handle idle behavior when the cat is not moving
 * Randomly selects idle animations based on position and time
 */
function idle() {
  idleTime += 1;

  // Randomly select an idle animation every ~20 seconds
  if (idleTime > 10 && Math.floor(Math.random() * 200) == 0 && idleAnimation == null) {
    let availableIdleAnimations = ["sleeping", "scratchSelf"];
    // Add wall scratching animations when near edges of screen
    if (nekoPosX < 32) {
      availableIdleAnimations.push("scratchWallW");
    }
    if (nekoPosY < 32) {
      availableIdleAnimations.push("scratchWallN");
    }
    if (nekoPosX > window.innerWidth - 32) {
      availableIdleAnimations.push("scratchWallE");
    }
    if (nekoPosY > window.innerHeight - 32) {
      availableIdleAnimations.push("scratchWallS");
    }
    // Randomly select an animation from available options
    idleAnimation = availableIdleAnimations[Math.floor(Math.random() * availableIdleAnimations.length)];
  }

  // Force sleeping animation if sleep mode is enabled
  if (forceSleep) {
    idleAnimation = "sleeping";
  }

  // Handle different idle animations
  switch (idleAnimation) {
    case "sleeping":
      // Handle nudging during forced sleep
      if (idleAnimationFrame < 8 && nudge && forceSleep) {
        setSprite("idle", 0);
        break;
      } else if (nudge) {
        nudge = false;
        resetIdleAnimation();
      }
      // Show tired animation before falling asleep
      if (idleAnimationFrame < 8) {
        setSprite("tired", 0);
        break;
      }
      // Sleeping animation: Directly set background position using known coordinates
      // Ensure we alternate between the two sleeping frames [-2, 0] and [-2, -1]
      // Slow down animation by only changing every 4 frames
      if (idleAnimationFrame % 4 === 0) {
        const sleepFrameIndex = Math.floor(idleAnimationFrame / 4) % 2; // Will alternate between 0 and 1
        const sleepingCoordinates = [
          [-2, 0], // Frame 0
          [-2, -1]  // Frame 1
        ];
        const [x, y] = sleepingCoordinates[sleepFrameIndex];
        if (nekoEl.value) {
          nekoEl.value.style.backgroundPosition = `${x * 32}px ${y * 32}px`;
        }
      }
      // Wake up after some time unless forced to sleep
      if (idleAnimationFrame > 192 && !forceSleep) {
        resetIdleAnimation();
      }
      break;
    // Handle wall scratching and self scratching animations
    case "scratchWallN":
    case "scratchWallS":
    case "scratchWallE":
    case "scratchWallW":
    case "scratchSelf":
      setSprite(idleAnimation, idleAnimationFrame);
      // Reset after animation completes
      if (idleAnimationFrame > 9) {
        resetIdleAnimation();
      }
      break;
    default:
      // Default idle pose
      setSprite("idle", 0);
      return;
  }
  idleAnimationFrame += 1;
}

/**
 * Main animation frame function - called at regular intervals
 * Handles cat movement and animation selection
 */
function frame() {
  frameCount += 1;

  // If cat is being grabbed, show alert sprite and don't move
  if (grabbing) {
    grabStop && setSprite("alert", 0);
    return;
  }

  // Calculate distance and direction to mouse cursor
  const diffX = nekoPosX - mousePosX;
  const diffY = nekoPosY - mousePosY;
  const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

  // === FIX START ===
  // If forceSleep is true, OR if the cat is close enough to the cursor (and not forced to sleep),
  // call idle() and skip the movement logic for this frame.
  if (forceSleep || (distance < nekoSpeed || distance < 48)) {
    idle();
    return; // Return early to prevent movement logic when idle or sleeping
  }
  // === FIX END ===

  // Reset idle animation when moving (this code will now only run if not sleeping and not close to cursor)
  idleAnimation = null;
  idleAnimationFrame = 0;

  // Show alert animation briefly before starting to move
  if (idleTime > 1) {
    setSprite("alert", 0);
    // Count down after being alerted before moving
    idleTime = Math.min(idleTime, 7);
    idleTime -= 1;
    return;
  }

  // Determine movement direction based on relative position to cursor
  let direction = diffY / distance > 0.5 ? "N" : "";
  direction += diffY / distance < -0.5 ? "S" : "";
  direction += diffX / distance > 0.5 ? "W" : "";
  direction += diffX / distance < -0.5 ? "E" : "";
  setSprite(direction, frameCount);

  // Move cat toward the cursor
  nekoPosX -= (diffX / distance) * nekoSpeed;
  nekoPosY -= (diffY / distance) * nekoSpeed;

  // Keep cat within window boundaries
  nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
  nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

  // Update cat position on screen
  if (nekoEl.value) {
    nekoEl.value.style.left = `${nekoPosX - 16}px`;
    nekoEl.value.style.top = `${nekoPosY - 16}px`;
  }
}

/**
 * Update mouse position when the mouse moves
 * Ignored if cat is in forced sleep mode
 */
function handleMouseMove(e) {
  if (forceSleep) return;

  mousePosX = e.clientX;
  mousePosY = e.clientY;
}

/**
 * Handle mouse down event to allow dragging the cat
 * Only responds to left mouse button (button 0)
 */
function handleMouseDown(e) {
  // Prevent default behavior to avoid text selection while dragging
  e.preventDefault();
  
  if (e.button !== 0) return;
  grabbing = true;
  let startX = e.clientX;
  let startY = e.clientY;
  let startNekoX = nekoPosX;
  let startNekoY = nekoPosY;
  let grabInterval;

  // Handle mouse movement during dragging
  const mousemove = (e) => {
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Show scratching animation in the opposite direction of the drag
    if (absDeltaX > absDeltaY && absDeltaX > 10) {
      setSprite(deltaX > 0 ? "scratchWallW" : "scratchWallE", frameCount);
    } else if (absDeltaY > absDeltaX && absDeltaY > 10) {
      setSprite(deltaY > 0 ? "scratchWallN" : "scratchWallS", frameCount);
    }

    // Reset starting position if dragging stops briefly
    if (grabStop || absDeltaX > 10 || absDeltaY > 10 || Math.sqrt(deltaX ** 2 + deltaY ** 2) > 10) {
      grabStop = false;
      clearTimeout(grabInterval);
      grabInterval = setTimeout(() => {
        grabStop = true;
        nudge = false;
        startX = e.clientX;
        startY = e.clientY;
        startNekoX = nekoPosX;
        startNekoY = nekoPosY;
      }, 150);
    }

    // Update cat position based on mouse movement
    nekoPosX = startNekoX + e.clientX - startX;
    nekoPosY = startNekoY + e.clientY - startY;
    
    // Apply position to the DOM element
    if (nekoEl.value) {
      nekoEl.value.style.left = `${nekoPosX - 16}px`;
      nekoEl.value.style.top = `${nekoPosY - 16}px`;
    }
  };

  // Handle mouse up to end dragging
  const mouseup = () => {
    grabbing = false;
    nudge = true;
    resetIdleAnimation();
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
  };

  // Add event listeners for the duration of the drag
  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);
}

/**
 * Toggle sleep mode on double click
 * Double clicking the cat will make it sleep or wake up
 */
function handleDblClick() {
  forceSleep = !forceSleep;
  nudge = false;
  
  // Reset animation when waking up
  if (!forceSleep) {
    resetIdleAnimation();
  }
}

/**
 * Setup when component is mounted
 * Initialize position and start animation loop
 */
onMounted(() => {
  // Initialize neko position
  if (nekoEl.value) {
    nekoEl.value.style.left = `${nekoPosX - 16}px`;
    nekoEl.value.style.top = `${nekoPosY - 16}px`;
  }

  // Track mouse movement
  window.addEventListener('mousemove', handleMouseMove);
  
  // Start animation frame loop (runs every 100ms)
  onekoInterval = setInterval(frame, 100);
});

/**
 * Cleanup when component is unmounted
 * Remove event listeners and stop animation loop
 */
onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  if (onekoInterval) {
    clearInterval(onekoInterval);
  }
});
</script>

<template>
  <!-- 
    The cat element - a simple div with the oneko class 
    - ref="nekoEl" gives JavaScript access to this DOM element
    - mousedown event triggers the dragging behavior
    - dblclick toggles sleep mode
    - contextmenu.prevent prevents right-click menu from appearing
  -->
  <div 
    ref="nekoEl" 
    class="oneko" 
    @mousedown="handleMouseDown" 
    @dblclick="handleDblClick"
    @contextmenu.prevent
  />
</template>

<style scoped>
/* 
 * Styling for the cat element
 * - Fixed 32x32px size matching the sprite size
 * - Fixed position so it can move freely around the screen
 * - Uses a sprite sheet for animations
 * - Pixelated rendering for crisp pixel art look
 * - High z-index to appear above other content
 * - Pointer cursor to indicate interactivity
 */
.oneko {
  width: 32px;
  height: 32px;
  position: fixed;
  background-image: url('/oneko-classic.gif');
  image-rendering: pixelated;
  z-index: 99;
  cursor: pointer;
}
</style>
