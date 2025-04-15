import { defineConfig } from 'vitepress'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'
import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [pagefindPlugin(),tailwindcss(),Components()],
    
  },
  title: "Akhil Ramchand",
  description: "An internet garden where i write about things that are important to me and belive must be shared with the world",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '<p class=\'sidebarheading\' > Examples </p>',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
