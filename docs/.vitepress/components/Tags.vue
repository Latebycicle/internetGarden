<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { useData } from 'vitepress' // Import useData

const { frontmatter } = useData()
const lastUpdated = frontmatter.value.lastUpdated
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
    <p v-if="readingTime" class="readingTime">{{ readingTime }} min read</p>
    <p class="separator">∙</p>
    <div class="tags-list">
      <Badge v-for="tag in props.tags" :key="tag" type="info" :text="tag" style="margin-right: 5px;" />
    </div>
    <p class="separator">∙</p>
    <p v-if="lastUpdated" class="readingTime">Last updated: {{ new Date(lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
  </div>

</template>
<style scoped>
.timetagscontainer {
  font-size: 0.8em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  line-height: 0em;
  grid-gap: 0px 2px;
  padding-bottom: 0em;
  padding-left: 0.5em;
}

.readingTime {
  margin: 0;
  font-weight: normal;  
  min-width: fit-content;
}

.tags-list {
    display: flex;
    width: fit-content;
    line-height: 2em;
    padding-top: 0.3em;
}

.separator {
  margin: 0 5px;
  color: #888;
}
</style>