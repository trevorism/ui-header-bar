<script setup>
import { NConfigProvider, NMenu, NButton, NSpace } from "naive-ui";
import { h } from "vue";

const themeOverrides = {
  Menu: {
    peers: {
      Dropdown: {
        colorInverted: "black",
      },
    },
  },
};

const menuOptions = [
  {
    label: "Apps",
    key: "apps",
    children: [
      {
        label: () => h("a", { href: "https://www.trevorism.com" }, "Home"),
        key: "home",
      },
      {
        label: () => h("a", { href: "https://click.trevorism.com" }, "Click"),
        key: "click",
      },
      {
        label: () =>
          h(
            "a",
            { href: "https://active.project.trevorism.com" },
            "Service Registry"
          ),
        key: "service_registry",
      },
    ],
  },
  {
    label: "Articles",
    key: "articles",
    children: [
      {
        label: () =>
          h(
            "a",
            { href: "https://www.trevorism.com/docs" },
            "Trevorism Documentation"
          ),
        key: "trevorism_documentation",
      },
      {
        label: () =>
          h(
            "a",
            { href: "https://www.trevorism.com/articles/prototype" },
            "Prototype Driven Development 05/2013"
          ),
        key: "prototype_driven_development",
      },
      {
        label: () =>
          h(
            "a",
            { href: "https://www.trevorism.com/articles/trends" },
            "Technology Trends 02/2018"
          ),
        key: "technology_trends",
      },
      {
        label: () =>
          h(
            "a",
            { href: "https://www.trevorism.com/articles/production" },
            "Technology Trends 02/2018"
          ),
        key: "productionalized_service",
      },
      {
        label: () =>
          h(
            "a",
            { href: "https://www.trevorism.com/articles/improvement" },
            "Scientific Improvement 12/2020"
          ),
        key: "scientific_improvement",
      },
    ],
  },
  {
    label: () =>
      h("a", { href: "https://www.trevorism.com/contact" }, "Contact"),
    key: "contact",
  },
  {
    label: "Tools",
    key: "tools",
    children: [
      {
        label: () =>
          h(
            "a",
            { href: "https://github.com/trevorism" },
            "Github"
          ),
        key: "github",
      },
      {
        label: () =>
          h(
            "a",
            { href: "https://console.cloud.google.com" },
            "Google Cloud"
          ),
        key: "google_cloud",
      },
      {
        label: () =>
          h(
            "a",
            { href: "https://admin.google.com/u/1/?pli=1" },
            "Google Apps"
          ),
        key: "google_apps",
      },
      {
        label: () =>
          h(
            "a",
            { href: "https://kanbanflow.com/board/a6a2c3aa67d9492ac64007975f9f322a" },
            "Kanban Flow"
          ),
        key: "kanban_flow",
      },
      {
        label: () =>
          h(
            "a",
            { href: "https://www.npmjs.com/search?q=%40trevorism" },
            "NPM"
          ),
        key: "npm",
      },
    ],
  },
  {
    label: () =>
      h("a", { href: "https://www.trevorism.com/admin" }, "Admin"),
    show: true,
    key: "admin",
  },
];
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-space justify="space-between" class="header">
      <div>
        <a href="https://trevorism.com">
          <img src="../assets/TrevorismLogo.png" class="logo-image valign" />
        </a>
        <n-menu
          mode="horizontal"
          :options="menuOptions"
          :inverted="true"
          :theme-overrides="menuThemeOverrides"
        />
      </div>
      <div>
        <span class="changeMeToIsAuthenticated valign" >
          <n-button type="primary">one</n-button>
          <n-button type="default">two</n-button>
        </span>
        <span class="changeMeToIfElse valign" style="display: none">
          <n-button type="primary">one</n-button>
          <n-button type="default">two</n-button>
        </span>
      </div>
    </n-space>
  </n-config-provider>
</template>

<style scoped>
.header {
  background: black;
}

.valign{
  vertical-align: middle;
}

.logo-image {
  padding-right: 20px;
}
</style>
