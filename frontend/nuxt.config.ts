export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in'
    }
  },
  sourcemap: {
    server: true,
    client: true
  },
  compatibilityDate: '2025-02-26',
  devtools: {
    enabled: true
  },
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/svg-sprite'
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.ts'
      }
    ],
    lazy: true,
    defaultLocale: 'en'
  }
})
