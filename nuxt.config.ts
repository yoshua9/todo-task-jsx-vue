// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  typescript: {
    shim: false,
    typeCheck: true,
    strict: true,
  },
  ssr: false,
  build: {
    transpile: ["vuetify"],
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "@/assets/scss/global.scss",
  ],
  modules: ["@pinia/nuxt"],
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  runtimeConfig: {
    public: {
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
      recaptchaSecret: process.env.RECAPTCHA_SECRET,
    },
  },
});
