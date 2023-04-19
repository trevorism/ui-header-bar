<template>
  <va-navbar v-bind="blackColor" class="header" style="height:70px">
    <template #left>
      <va-navbar-item class="logo">
        <a href="https://trevorism.com">
          <img src="../assets/TrevorismLogo.png" alt="Trevorism" class="logo-image" />
        </a>
      </va-navbar-item>

      <va-navbar-item v-bind:key="item.name" v-for="item in leftMenuBar">
        <va-button-dropdown v-if="item.hasOwnProperty('children')" :label="item.name" size="medium" class="mr-2 mb-2">
          <multi-menu-link-item v-bind:key="child.name" v-for="child in item.children" :href="child.href">{{child.name}}</multi-menu-link-item>
        </va-button-dropdown>
        <va-button v-else size="medium" class="mr-2 mb-2">{{ item.name }}</va-button>
      </va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item v-bind:key="item.name" v-for="item in rightMenuBar">
        <va-button-dropdown v-if="item.hasOwnProperty('children')" :label="item.name" size="medium" class="mr-2 mb-2">
          <multi-menu-link-item v-bind:key="child.name" v-for="child in item.children" :href="child.href">{{child.name}}</multi-menu-link-item>
        </va-button-dropdown>
        <va-button v-else size="medium" class="mr-2 mb-2">{{ item.name }}</va-button>
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
      <va-icon name="menu" @click="showMiniMenu" />
    </div>
  </div>
  <side-menu v-if="showingMiniMenu" v-click-away="hideMiniMenu" :data="allMenuOptions"></side-menu>

</template>

<script setup>
import MultiMenuLinkItem from "./MultiMenuLinkItem.vue";
import SideMenu from "./SideMenu.vue";
import { ref, computed } from "vue";

const apps = {
  "name": "Apps", "children": [
    { "name": "Home", "link": "https://www.trevorism.com" },
    { "name": "Timeline Generator", "link": "https://timeline.draw.trevorism.com" },
    { "name": "Service Registry", "link": "https://active.project.trevorism.com" }
  ]
};
const articles = {
  "name": "Articles", "children": [
    { "name": "Trevorism Documentation", "link": "/docs" },
    { "name": "Prototype Driven Development 05/2013", "link": "/articles/prototype" },
    { "name": "Technology Trends 02/2018", "link": "/articles/trends" },
    { "name": "Productionalized Service 02/2018", "link": "/articles/production" },
    { "name": "Scientific Improvement 12/2020", "link": "/articles/improvement" }
  ]
};

const contact = {  "name": "Contact", "link": "/contact" };
const tools = {
  "name": "Tools", "children": [
    { "name":"Github", "link": "https://github.com/trevorism" },
    { "name":"Kanban Flow", "link": "https://kanbanflow.com/board/a6a2c3aa67d9492ac64007975f9f322a" },
    { "name":"NPM", "link": "https://www.npmjs.com/search?q=%40trevorism" },
    { "name":"Google Cloud", "link": "https://console.cloud.google.com" },
    { "name":"Google Apps", "link": "https://admin.google.com/u/1/?pli=1" }
  ]
};
const admin = { "name": "Admin", "link": "/admin" };
const register = {  "name": "Register", "link": "/register" };
const login = {  "name": "Login", "link": "/login" };
//const logout = {  "name": "Logout", "link": "/logout" };
//const account = {  "name": "Account", "link": "/account" }

const leftMenuBar = [apps, articles, contact, tools, admin];
const rightMenuBar = [register, login]

const blackColor = { color: "#000000" };
const showingMiniMenu = ref(false);

const allMenuOptions = computed(() => {
  return [].concat(leftMenuBar, rightMenuBar);
});

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