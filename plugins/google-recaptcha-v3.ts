import { VueReCaptcha } from "vue-recaptcha-v3";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const options = {
    siteKey: config.public.recaptchaSiteKey,
    loaderOptions: {
      autoHideBadge: true,
    },
  };
  nuxtApp.vueApp.use(VueReCaptcha, options);
});
