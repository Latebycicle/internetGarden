// https://vitepress.dev/guide/custom-theme
import { h, createApp } from 'vue' // Import createApp
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
// import Layout from './Layout.vue' // Layout import might not be needed if just extending
import Tags from '../components/Tags.vue'
import Heroani from '../components/Heroani.vue'
import Oneko from '../components/Oneko.vue'

export default {
  extends: DefaultTheme,
  // Layout: () => { // Keep default layout unless customizing slots extensively
  //   return h(DefaultTheme.Layout, null, {
  //     // https://vitepress.dev/guide/extending-default-theme#layout-slots
  //   })
  // },
  enhanceApp({ app, router, siteData }) {
    app.component('Tags', Tags)
    app.component('Heroani', Heroani)
    // app.component('Oneko', Oneko) // Remove component registration

    // Mount Oneko globally on the client side
    if (typeof window !== 'undefined') { // Check if running in browser
      const onekoAppContainer = document.createElement('div');
      onekoAppContainer.id = 'oneko-container'; // Give it an ID
      document.body.appendChild(onekoAppContainer);
      createApp(Oneko).mount(onekoAppContainer);
    }
  }
} satisfies Theme
