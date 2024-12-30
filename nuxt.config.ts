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
      apiBase: 'http://localhost:8787/api/',
      apiAuth: ')Kl,5sT"WDE*=qqIe;is#D[xkvvF87UooKjG;7V]PAz8dQzC3tSd{7.j7mK9)Clt',
    }
  },

  modules: ['@nuxtjs/tailwindcss']
})