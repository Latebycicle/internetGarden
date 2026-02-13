<script setup>
import { ref, computed } from 'vue'

const showHidden = ref(false)

// Logic for XOR: (x1 OR x2) AND (NOT (x1 AND x2)) - simplified MLP intuitive view
// Input: x1, x2
// Hidden Layer: 
//   h1 = x1 + x2 - 0.5 > 0  (OR gate)
//   h2 = x1 + x2 - 1.5 > 0  (AND gate) -- wait, for XOR we usually use NAND
// Let's use: XOR = NAND(x,y) AND OR(x,y)
// H1 (NAND): -1*x1 + -1*x2 + 1.5 > 0
// H2 (OR): 1*x1 + 1*x2 - 0.5 > 0
// Output: 1*H1 + 1*H2 - 1.5 > 0 (AND)

const h1_w1 = -1
const h1_w2 = -1
const h1_b = 1.5 // NAND threshold

const h2_w1 = 1
const h2_w2 = 1
const h2_b = -0.5 // OR threshold

const out_w1 = 1
const out_w2 = 1
const out_b = -1.5 // AND threshold

const points = [
  { x: 0, y: 0, label: 0 },
  { x: 0, y: 1, label: 1 },
  { x: 1, y: 0, label: 1 },
  { x: 1, y: 1, label: 0 }
]

const testX = ref(0.5)
const testY = ref(0.5)

const hiddenValues = computed(() => {
    const h1_sum = testX.value * h1_w1 + testY.value * h1_w2 + h1_b
    const h1 = h1_sum > 0 ? 1 : 0
    
    const h2_sum = testX.value * h2_w1 + testY.value * h2_w2 + h2_b
    const h2 = h2_sum > 0 ? 1 : 0
    
    return { h1, h2 }
})

const finalOutput = computed(() => {
    if (!showHidden.value) return null // Single layer can't do it
    const { h1, h2 } = hiddenValues.value
    const out_sum = h1 * out_w1 + h2 * out_w2 + out_b
    return out_sum > 0 ? 1 : 0
})

// Visualization helpers
const scaleX = (val) => val * 200 + 50
const scaleY = (val) => 250 - val * 200

</script>

<template>
  <div class="demo-container p-6 border rounded-xl bg-gray-50 border-gray-200 shadow-sm my-6">
    <h3 class="font-bold text-xl mb-4 text-gray-800">The XOR Problem</h3>
    
    <div class="flex flex-col md:flex-row gap-8">
        <div class="w-full md:w-1/2">
            <p class="text-gray-600 mb-6 leading-relaxed">
                Try to draw a single straight line to separate the <strong class="text-emerald-600">Green (1)</strong> points from <strong class="text-red-600">Red (0)</strong> points.
                
                <div class="mt-4 p-4 rounded-lg bg-white border border-gray-200">
                    <span v-if="!showHidden" class="text-red-500 font-bold block mb-2">It's impossible with a single line!</span>
                    <span v-else class="text-emerald-600 font-bold block mb-2">Made possible with a Hidden Layer!</span>
                    <p class="text-sm text-gray-500">
                         The hidden layer creates <strong>two</strong> decision boundaries (Or & Nand) and combines them.
                    </p>
                </div>
            </p>

            <button @click="showHidden = !showHidden" 
                class="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-sm active:scale-95">
                {{ showHidden ? 'Hide Hidden Layer' : 'Add Hidden Layer' }}
            </button>
            
            <div v-if="showHidden" class="mt-6 text-sm bg-blue-50 text-blue-900 p-4 rounded-lg border border-blue-100">
                <p class="font-bold mb-2">How it works:</p>
                <ul class="list-disc ml-4 space-y-1">
                    <li><strong>Neuron A (NAND):</strong> Separates the top-right red point.</li>
                    <li><strong>Neuron B (OR):</strong> Separates the bottom-left red point.</li>
                    <li><strong>Output (AND):</strong> Activates only when both A & B agree.</li>
                </ul>
            </div>
        </div>

        <div class="w-full md:w-1/2 h-[300px] border border-gray-200 bg-white rounded-xl shadow-inner relative overflow-hidden">
             <svg width="100%" height="100%" viewBox="0 0 300 300">
                <!-- Grid -->
                <line x1="50" y1="0" x2="50" y2="300" stroke="#e5e7eb" stroke-width="2" />
                <line x1="0" y1="250" x2="300" y2="250" stroke="#e5e7eb" stroke-width="2" />

                <!-- Axis Labels -->
                <text x="280" y="245" font-size="10" fill="#9ca3af">x₁</text>
                <text x="55" y="20" font-size="10" fill="#9ca3af">x₂</text>

                <!-- XOR Points -->
                <circle v-for="(p, i) in points" :key="i"
                    :cx="scaleX(p.x)" :cy="scaleY(p.y)" r="8"
                    :fill="p.label === 1 ? '#10b981' : '#ef4444'"
                    stroke="white" stroke-width="2"
                    class="transition-all duration-500"
                />

                <!-- Visualization of Decision Boundaries (Conceptual) -->
                <g v-if="showHidden">
                    <!-- NAND Line (Approx) -->
                    <line x1="0" y1="100" x2="300" y2="-50" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5,5" />
                    <!-- OR Line (Approx) -->
                    <line x1="-50" y1="300" x2="300" y2="100" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="5,5" />
                    <text x="20" y="30" fill="#f59e0b" font-size="10" font-weight="bold">NAND Boundary</text>
                    <text x="200" y="270" fill="#8b5cf6" font-size="10" font-weight="bold">OR Boundary</text>
                </g>
             </svg>
             
             <!-- Legend -->
            <div class="absolute bottom-2 right-2 bg-white/90 backdrop-blur p-2 rounded border border-gray-100 text-xs shadow-sm">
                <div class="flex items-center gap-2 mb-1">
                    <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span class="text-gray-600">x₁ XOR x₂ = 1</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-red-500"></span>
                    <span class="text-gray-600">x₁ XOR x₂ = 0</span>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
