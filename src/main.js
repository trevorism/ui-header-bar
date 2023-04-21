import { createApp } from "vue";
import App from "./App.vue";
import VueClickAway from "vue3-click-away";
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: {
        template: "",
      },
    },
  ],
});
const app = createApp(App);
app.use(router);
app.use(VueClickAway);
app.use(createVuestic());
app.mount("#app");
