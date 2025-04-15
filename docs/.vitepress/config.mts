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
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/index' },
    ],

    sidebar: [
      {
        text: '<p class=\'sidebarheading\' > Posts </p>',
        items: [
          { text: 'Art Of Visual Storytelling', link: '/artofvisualstorytelling' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Latebycicle/' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/akhil-ramchand/' },
      { icon: 'instagram', link: 'https://www.instagram.com/latebycicle/' },
      { icon: 'gmail', link: 'https://mail.google.com/mail/?view=cm&to=Latebyciclenz@gmail.com' }
    ]
  }
})
