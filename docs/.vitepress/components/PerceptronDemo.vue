<script setup>
import { ref, computed } from 'vue'

const w1 = ref(0.5)
const w2 = ref(0.5)
const bias = ref(-0.5) // Threshold as bias

const x1 = ref(0)
const x2 = ref(0)

const output = computed(() => {
  const sum = x1.value * w1.value + x2.value * w2.value + bias.value
  return sum > 0 ? 1 : 0
})

const weightedSum = computed(() => {
   return (x1.value * w1.value + x2.value * w2.value + bias.value).toFixed(2)
})

// Points for visualization (static OR gate example)
const points = [
  { x: 0, y: 0, label: 0 },
  { x: 0, y: 1, label: 1 },
  { x: 1, y: 0, label: 1 },
  { x: 1, y: 1, label: 1 }
]

// Line equation: w1*x + w2*y + b = 0  =>  y = (-w1*x - b) / w2
const getY = (x) => {
    if (Math.abs(w2.value) < 0.01) return 0 // Avoid division by zero
    return (-w1.value * x - bias.value) / w2.value
}

const linePoints = computed(() => {
    // Calculate start and end points for the line within a 0-1 range (extended for visuals)
    const startX = -0.5
    const endX = 1.5
    const startY = getY(startX)
    const endY = getY(endX)
    return `${scaleX(startX)},${scaleY(startY)} ${scaleX(endX)},${scaleY(endY)}`
})

// Scaling for SVG (0-1 domain to 0-300 pixels)
const scaleX = (val) => val * 200 + 50
const scaleY = (val) => 250 - val * 200 // Invert Y

</script>

<template>
  <div class="demo-container p-6 border rounded-xl bg-gray-50 border-gray-200 shadow-sm">
    <h3 class="font-bold text-xl mb-6 text-gray-800">Interactive Perceptron: The OR Gate</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Controls -->
      <div class="controls space-y-6">
        <div class="control-group">
            <label class="block text-sm font-medium text-gray-700 mb-1">Weight 1 (w<sub>1</sub>): {{ w1 }}</label>
            <input type="range" min="-5" max="5" step="0.1" v-model.number="w1" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
        </div>
        <div class="control-group">
            <label class="block text-sm font-medium text-gray-700 mb-1">Weight 2 (w<sub>2</sub>): {{ w2 }}</label>
            <input type="range" min="-5" max="5" step="0.1" v-model.number="w2" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
        </div>
        <div class="control-group">
            <label class="block text-sm font-medium text-gray-700 mb-1">Bias (b): {{ bias }}</label>
            <input type="range" min="-5" max="5" step="0.1" v-model.number="bias" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
        </div>

        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mt-4">
             <h4 class="font-semibold mb-3 text-gray-800 border-b pb-2">Test Your Own Inputs</h4>
             <div class="flex gap-4 mb-3">
                 <div>
                    <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Input x<sub>1</sub></label>
                    <input type="number" v-model.number="x1" class="border border-gray-300 rounded px-2 py-1 w-20 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                 </div>
                 <div>
                    <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Input x<sub>2</sub></label>
                    <input type="number" v-model.number="x2" class="border border-gray-300 rounded px-2 py-1 w-20 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                 </div>
             </div>
             <div class="font-mono text-sm text-gray-600 bg-gray-50 p-2 rounded">
                 <div>Sum: <span class="font-bold">{{ weightedSum }}</span></div>
                 <div class="mt-1">Output: <span :class="output > 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'">{{ output }}</span></div>
             </div>
        </div>
      </div>

      <!-- Visualization -->
      <div class="visualization relative h-[300px] border border-gray-200 bg-white rounded-xl shadow-inner overflow-hidden">
         <svg width="100%" height="100%" viewBox="0 0 300 300">
            <!-- Grid Lines -->
            <line x1="50" y1="0" x2="50" y2="300" stroke="#e5e7eb" stroke-width="2" />
            <line x1="0" y1="250" x2="300" y2="250" stroke="#e5e7eb" stroke-width="2" />
            
            <!-- Axis Labels -->
            <text x="280" y="245" font-size="10" fill="#9ca3af">x₁</text>
            <text x="55" y="20" font-size="10" fill="#9ca3af">x₂</text>

            <!-- Decision Boundary -->
             <polyline :points="linePoints" stroke="#3b82f6" stroke-width="3" opacity="0.8" />

             <!-- Data Points -->
             <circle v-for="(p, i) in points" :key="i"
                :cx="scaleX(p.x)" :cy="scaleY(p.y)" r="8"
                :fill="p.label === 1 ? '#10b981' : '#ef4444'"
                stroke="white" stroke-width="2"
                class="transition-all duration-300"
             />
             
             <!-- Current Test Point -->
             <circle :cx="scaleX(x1)" :cy="scaleY(x2)" r="10" fill="transparent" stroke="#f59e0b" stroke-width="3" stroke-dasharray="4,2" />
         </svg>
         
         <!-- Legend -->
         <div class="absolute bottom-2 right-2 bg-white/90 backdrop-blur p-2 rounded border border-gray-100 text-xs shadow-sm">
             <div class="flex items-center gap-2 mb-1">
                 <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
                 <span class="text-gray-600">Target 1 (True)</span>
             </div>
             <div class="flex items-center gap-2 mb-1">
                 <span class="w-3 h-3 rounded-full bg-red-500"></span>
                 <span class="text-gray-600">Target 0 (False)</span>
             </div>
             <div class="flex items-center gap-2">
                 <span class="w-3 h-3 rounded-full border-2 border-amber-500 border-dashed"></span>
                 <span class="text-gray-600">Your Input</span>
             </div>
         </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type=range] {
  accent-color: #3b82f6;
}
</style>
