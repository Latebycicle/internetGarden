<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #aside-top>
        <div class="aside-top">
            <h2>Aside Top</h2>
            <p>This is the aside top section.</p>
        </div>
    </template>
  </Layout>
</template>