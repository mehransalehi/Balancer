// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app:{
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css',
        },
      ],
    },
  },
  css: ['bootstrap/dist/css/bootstrap.min.css'],

  runtimeConfig: {
    // Keys within public are also exposed client-side
    public: {
      apiBase: process.env.API_URL,
      apiAuth: process.env.AUTH_TOKEN,
    }
  },

  modules: ['@nuxtjs/tailwindcss']
})