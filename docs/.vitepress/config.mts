import { defineConfig } from 'vitepress'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'
import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite'
import { joinURL, withoutTrailingSlash } from 'ufo' // Add ufo imports
import mathjax3 from 'markdown-it-mathjax3'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(mathjax3)
      // Custom TikZ plugin (transforms tikz blocks to <script type="text/tikz">)
      const defaultFence = md.renderer.rules.fence || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
      };

      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        if (token.info.trim() === 'tikz') {
          // Encode content to pass safely to Vue component
          const encoded = encodeURIComponent(token.content);
          return `<TikZ code="${encoded}" />`;
        }
        return defaultFence(tokens, idx, options, env, self);
      };
    }
  },
  vite: {
    plugins: [pagefindPlugin(), tailwindcss(), Components()],

  },
  language: 'en-US',
  appearance: {
    // @ts-expect-error not fully supported yet
    initialValue: 'light'
  },
  cleanUrls: true,
  base: '/',
  title: "Akhil Ramchand",
  description: "Akhil Ramchand's personal blog",
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
          { text: 'Knowledge Distillation', link: '/KnowledgeDistillation' },
          { text: 'Metacognition: The basis of good AI Interaction', link: '/Metacognition' },
          { text: 'Insights on AI and education from the Bengaluru Skill Summit 2025', link: '/AIeducation' },
          { text: 'Basics of AI', link: '/BasicsofAI' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Latebycicle/' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/akhil-ramchand/' },
      { icon: 'instagram', link: 'https://www.instagram.com/latebycicle/' },
      { icon: 'gmail', link: 'https://mail.google.com/mail/?view=cm&to=Latebyciclenz@gmail.com' }
    ]
  },
  sitemap: {
    hostname: 'https://akhilr.tech',
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto:300,400,500,700' }],
    ['link', { rel: 'stylesheet', href: 'https://tikzjax.com/v1/fonts.css' }],
    ['script', { src: 'https://tikzjax.com/v1/tikzjax.js' }]
  ],

  // Add transformPageData for SEO meta tags
  transformPageData(pageData, { siteConfig }) {
    // Initialize the `head` frontmatter if it doesn't exist.
    pageData.frontmatter.head ??= []

    // Add basic meta tags to the frontmatter.
    pageData.frontmatter.head.push(
      [
        'meta',
        {
          property: 'og:title',
          content:
            pageData.frontmatter.title || pageData.title || siteConfig.site.title,
        },
      ],
      [
        'meta',
        {
          name: 'twitter:title',
          content:
            pageData.frontmatter.title || pageData.title || siteConfig.site.title,
        },
      ],
      [
        'meta',
        {
          property: 'og:description',
          content:
            pageData.frontmatter.description || pageData.description || siteConfig.site.description,
        },
      ],
      [
        'meta',
        {
          name: 'twitter:description',
          content:
            pageData.frontmatter.description || pageData.description || siteConfig.site.description,
        },
      ],

      // Add canonical URL link tag
      [
        'link',
        {
          rel: 'canonical',
          href: joinURL(
            'https://akhilr.tech', // Use your domain here
            withoutTrailingSlash(pageData.filePath.replace(/(index)?\.md$/, '')),
          ),
        },
      ],
      // Add Open Graph URL meta tag
      [
        'meta',
        {
          property: 'og:url',
          content: joinURL(
            'https://akhilr.tech', // Use your domain here
            withoutTrailingSlash(pageData.filePath.replace(/(index)?\.md$/, '')),
          ),
        },
      ]
    )
  },
})
