<script setup>
import { ref, computed, onMounted } from 'vue'

const learningRate = ref(0.1)
const currentX = ref(-4) // Start point
const history = ref([{x: -4, y: 16}])
const isRunning = ref(false)

// Function to minimize: y = x^2
// Derivative: dy/dx = 2x

const f = (x) => x * x
const df = (x) => 2 * x

const step = () => {
    if (Math.abs(df(currentX.value)) < 0.01) {
        isRunning.value = false
        return
    }
    
    // Gradient Descent Update Rule: x_new = x_old - learning_rate * gradient
    const gradient = df(currentX.value)
    const nextX = currentX.value - learningRate.value * gradient
    
    currentX.value = nextX
    history.value.push({ x: nextX, y: f(nextX) })
    
    if (isRunning.value) {
        requestAnimationFrame(() => setTimeout(step, 100))
    }
}

const start = () => {
    if (isRunning.value) return
    isRunning.value = true
    step()
}

const reset = () => {
    isRunning.value = false
    currentX.value = -4
    history.value = [{x: -4, y: 16}]
}

// Visualization
const width = 300
const height = 200
const scaleX = (x) => (x + 5) * (width / 10) // Map -5..5 to 0..Width
const scaleY = (y) => height - (y * (height / 25)) // Map 0..25 to Height..0

const curvePath = computed(() => {
    let path = `M ${scaleX(-5)} ${scaleY(f(-5))}`
    for (let x = -5; x <= 5; x += 0.1) {
        path += ` L ${scaleX(x)} ${scaleY(f(x))}`
    }
    return path
})

</script>

<template>
  <div class="demo-container p-4 border rounded-lg bg-zinc-50 dark:bg-zinc-900 my-4">
    <h3 class="font-bold text-lg mb-2">Gradient Descent Visualization</h3>
    <p class="text-sm mb-4">Minimize $f(x) = x^2$ using Gradient Descent.</p>

    <div class="flex flex-col md:flex-row gap-6">
        <div class="controls w-full md:w-1/3 space-y-4">
             <div>
                <label class="block text-sm font-medium">Learning Rate ($\eta$): {{ learningRate }}</label>
                <input type="range" min="0.01" max="1.1" step="0.01" v-model.number="learningRate" class="w-full" />
                <p class="text-xs text-gray-500" v-if="learningRate > 0.9">Be careful! High learning rates can cause overshoot.</p>
             </div>
             
             <div class="flex gap-2">
                 <button @click="start" :disabled="isRunning" class="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50">
                    {{ isRunning ? 'Running...' : 'Start Descent' }}
                 </button>
                 <button @click="reset" class="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700">
                    Reset
                 </button>
             </div>
             
             <div class="font-mono text-sm bg-white dark:bg-zinc-800 p-2 rounded">
                x: {{ currentX.toFixed(4) }}<br>
                y: {{ f(currentX).toFixed(4) }}<br>
                Steps: {{ history.length - 1 }}
             </div>
        </div>

        <div class="visualization w-full md:w-2/3 h-[200px] border bg-white dark:bg-black rounded relative">
             <svg width="100%" height="100%" :viewBox="`0 0 ${width} ${height}`">
                <!-- Axis -->
                <line :x1="scaleX(0)" y1="0" :x2="scaleX(0)" :y2="height" stroke="#ddd" />
                <line x1="0" :y1="scaleY(0)" :x2="width" :y2="scaleY(0)" stroke="#ddd" />
                
                <!-- Function Curve -->
                <path :d="curvePath" fill="none" stroke="#3b82f6" stroke-width="2" />
                
                <!-- History Points -->
                <polyline :points="history.map(p => `${scaleX(p.x)},${scaleY(p.y)}`).join(' ')" 
                          fill="none" stroke="rgba(0,0,0,0.2)" stroke-dasharray="2,2" />
                
                <!-- Current Ball -->
                <circle :cx="scaleX(currentX)" :cy="scaleY(f(currentX))" r="6" fill="#ef4444" stroke="white" stroke-width="2" />
             </svg>
        </div>
    </div>
  </div>
</template>
