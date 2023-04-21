import { config } from "@vue/test-utils";
import { createVuestic } from "vuestic-ui";
import VueClickAway from "vue3-click-away";
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

config.global.plugins.push(router);
config.global.plugins.push(createVuestic());
config.global.plugins.push(VueClickAway);
