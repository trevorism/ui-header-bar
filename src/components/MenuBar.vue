<template>
  <va-navbar v-bind="blackColor" class="header" style="height:70px">
    <template #left>
      <va-navbar-item class="logo">
        <a href="https://trevorism.com">
          <img src="../assets/TrevorismLogo.png" alt="Trevorism" class="logo-image" />
        </a>
      </va-navbar-item>
      <va-navbar-item>
        <va-button-dropdown label="Apps" size="medium" class="mr-2 mb-2">
          <multi-menu-link-item href="https://www.trevorism.com">Home</multi-menu-link-item>
          <multi-menu-link-item href="https://timeline.draw.trevorism.com">Timeline Generator</multi-menu-link-item>
          <multi-menu-link-item href="https://active.project.trevorism.com">Service Registry</multi-menu-link-item>
        </va-button-dropdown>
      </va-navbar-item>
      <va-navbar-item>
        <va-button-dropdown label="Articles" size="medium" class="mr-2 mb-2">
          <multi-menu-link-item href="/docs">Trevorism Documentation</multi-menu-link-item>
          <multi-menu-link-item href="/articles/prototype">Prototype Driven Development 05/2013</multi-menu-link-item>
          <multi-menu-link-item href="/articles/trends">Technology Trends 02/2018</multi-menu-link-item>
          <multi-menu-link-item href="/articles/production">Productionalized Service 02/2018</multi-menu-link-item>
          <multi-menu-link-item href="/articles/improvement">Scientific Improvement 12/2020</multi-menu-link-item>
        </va-button-dropdown>
      </va-navbar-item>
      <va-navbar-item>
        <va-button size="medium" class="mr-2 mb-2">Contact</va-button>
      </va-navbar-item>
      <va-navbar-item>
        <va-button-dropdown size="medium" class="mr-2 mb-2" label="Tools">
          <multi-menu-link-item href="https://github.com/trevorism">Github</multi-menu-link-item>
          <multi-menu-link-item href="https://kanbanflow.com/board/a6a2c3aa67d9492ac64007975f9f322a">Kanban Flow
          </multi-menu-link-item>
          <multi-menu-link-item href="https://www.npmjs.com/search?q=%40trevorism">NPM</multi-menu-link-item>
          <multi-menu-link-item href="https://console.cloud.google.com">Google Cloud</multi-menu-link-item>
          <multi-menu-link-item href="https://admin.google.com/u/1/?pli=1">Google Apps</multi-menu-link-item>
        </va-button-dropdown>
      </va-navbar-item>
      <va-navbar-item>
        <va-button size="medium" class="mr-2 mb-2">Admin</va-button>
      </va-navbar-item>

    </template>
    <template #right>
      <va-navbar-item>
        <va-button size="medium" class="mr-2 mb-2">Register</va-button>
      </va-navbar-item>
      <va-navbar-item>
        <va-button size="medium" class="mr-2 mb-2">Login</va-button>
      </va-navbar-item>
    </template>
  </va-navbar>

  <div class="row mini-menu">
    <div class="flex flex-col">
      <a href="https://trevorism.com">
        <img src="../assets/TrevorismLogo.png" alt="Trevorism" class="logo-image" />
      </a>
    </div>
    <va-spacer></va-spacer>
    <div class="flex flex-col rightMenu">
      <va-icon name='menu' @click="showMiniMenu" />
    </div>
  </div>
  <side-menu v-if="showingMiniMenu" v-click-away="hideMiniMenu"></side-menu>

</template>

<script setup>
import MultiMenuLinkItem from "./MultiMenuLinkItem.vue";
import SideMenu from "./SideMenu.vue";
import { ref } from "vue";

const blackColor = {
  color: "#000000"
};

const showingMiniMenu = ref(false);

function showMiniMenu() {
  showingMiniMenu.value = !showingMiniMenu.value;
}

function hideMiniMenu() {
  showingMiniMenu.value = false;
}

</script>

<style scoped>

.rightMenu {
  display: flex;
  color: white;
}

@media (max-width: 900px) {
  .mini-menu {
    display: flex;
    background-color: black;
    width: 100%;
    padding: 24px 16px 16px;
    height: 70px;
  }
}

@media (min-width: 900px) {
  .mini-menu {
    display: none;
  }
}

@media (min-width: 900px) {
  .header {
  }
}

@media (max-width: 900px) {
  .header {
    display: none;
  }
}


</style>