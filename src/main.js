import { createApp } from "vue";
import { createHead } from "@vueuse/head";
import App from "./App.vue";
import router from "./router";
import reveal from "./directives/reveal.js";
import "./style.css";

createApp(App)
  .use(router)
  .use(createHead())
  .directive("reveal", reveal)
  .mount("#app");
