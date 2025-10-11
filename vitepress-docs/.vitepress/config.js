import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "zj-library",
  description: "个人常用的组件，工具方法和hooks",
  base: '/zj-library',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'vue-组件', link: '/vue-components/index' },
      { text: 'vue-钩子', link: '/vue-hooks/index' },
      { text: '工具方法', link: '/utils/index' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    outline: {
      level: [2, 3],
      label: "目录"
    }
  }
})
