import UUID from "vue3-uuid";

export default defineNuxtPlugin((app) => {
  app.vueApp.use(UUID);
});
