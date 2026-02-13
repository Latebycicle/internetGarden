<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  code: {
    type: String,
    required: true
  }
})

const container = ref(null)

const injectTikZ = () => {
    if (!container.value) return
    
    // Clear previous content
    container.value.innerHTML = ''
    
    // Create script tag manually
    const script = document.createElement('script')
    script.type = 'text/tikz'
    script.textContent = decodeURIComponent(props.code)
    
    container.value.appendChild(script)
    
    // Trigger TikZJax if available
    if (window.tikzjax) {
        // TikZJax usually watches the DOM, but sometimes needs a nudge or we wait for the observer
    }
}

onMounted(() => {
    injectTikZ()
})

watch(() => props.code, () => {
    injectTikZ()
})
</script>

<template>
  <div ref="container" class="tikz-container overflow-x-auto flex justify-center my-6 py-4 bg-white rounded-lg border border-gray-100 dark:border-gray-800 dark:bg-black/20">
      <!-- Script will be injected here -->
      <span class="text-xs text-gray-400">Loading TikZ...</span>
  </div>
</template>
