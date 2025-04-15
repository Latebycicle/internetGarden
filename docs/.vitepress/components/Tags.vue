<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { useData } from 'vitepress' // Import useData

const { frontmatter } = useData()
const props = defineProps({
  tags: {
    type: Array,
    required: true,
    default: () => []
  }
})

const readingTime = computed(() => {
  const wc = frontmatter.value.wc
  if (!wc || wc <= 0) {
    return 0 
  }
  return Math.ceil(wc / 200)
})
</script>

<template>
    <div class="timetagscontainer">
        <p v-if="readingTime" class="readingTime" >{{ readingTime }} min read</p>
        <p class="separator">∙</p>
        <div class="tags-list">
            <Badge v-for="tag in props.tags" :key="tag" type="info" :text="tag" style="margin-right: 5px;" />
        </div>
    </div>

</template>
<style scoped>
.timetagscontainer {
  display: flex; 
  align-items: center; 
  gap: 10px; 
  height: 2em;
  line-height: 2em;
  padding-bottom: 0.8em;
  padding-left: 0.5em;
}

.reading-time {
  margin: 0;
  font-weight: normal; 
  font-size: 0.9em; 
  color: var(--vp-c-text-2); 
}

.tags-list {
    display: flex; 
    flex-wrap: wrap; 
    padding-top: 0.2em;
}

</style>