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
  display: flex; /* Arrange children in a row */
  align-items: center; /* Vertically align items in the middle */
  gap: 10px; /* Add some space between the reading time and the tags */
  height: 2em;
  line-height: 2em; /* Align text vertically */
  padding-bottom: 0.8em;
  padding-left: 0.5em;
}

.reading-time {
  margin: 0; /* Remove default margin from h5 */
  font-weight: normal; /* Optional: Adjust font weight */
  font-size: 0.9em; /* Optional: Adjust font size */
  color: var(--vp-c-text-2); /* Use theme's secondary text color */
}

.tags-list {
    display: flex; /* Arrange tags in a row */
    flex-wrap: wrap; /* Allow tags to wrap to the next line if needed */
    padding-top: 0.2em;
}

</style>