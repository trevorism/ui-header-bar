<script setup>
import MenuButton from "./MenuButton.vue";
import MenuLink from "./MenuLink.vue";
import MultiMenuLink from "./MultiMenuLink.vue";
import MultiMenuLinkItem from "./MultiMenuLinkItem.vue";
</script>

<script>
export default {
  name: "HeaderBar",
  data() {
    return {
      authenticated: false,
      admin: true,
    };
  }
};
</script>

<template>
  <div class="header navBar">
    <div class="tism-menuItem header-icon">
      <a href="https://trevorism.com">
        <img src="../assets/TrevorismLogo.png" alt="Trevorism" class="logo-image" />
      </a>
    </div>
    <div class="tism-menuItem">
      <multi-menu-link label="Apps">
        <multi-menu-link-item href="https://www.trevorism.com">Home</multi-menu-link-item>
        <multi-menu-link-item href="https://timeline.draw.trevorism.com">Timeline Generator</multi-menu-link-item>
        <multi-menu-link-item href="https://active.project.trevorism.com">Service Registry</multi-menu-link-item>
      </multi-menu-link>
    </div>
    <div class="tism-menuItem">
      <multi-menu-link label="Articles">
        <multi-menu-link-item href="/docs">Trevorism Documentation</multi-menu-link-item>
        <multi-menu-link-item href="/articles/prototype">Prototype Driven Development 05/2013</multi-menu-link-item>
        <multi-menu-link-item href="/articles/trends">Technology Trends 02/2018</multi-menu-link-item>
        <multi-menu-link-item href="/articles/production">Productionalized Service 02/2018</multi-menu-link-item>
        <multi-menu-link-item href="/articles/improvement">Scientific Improvement 12/2020</multi-menu-link-item>
      </multi-menu-link>
    </div>
    <div class="tism-menuItem">
      <menu-link href="/contact">Contact</menu-link>
    </div>
    <div class="tism-menuItem">
      <multi-menu-link label="Tools" v-if="authenticated">
        <multi-menu-link-item href="https://github.com/trevorism">Github</multi-menu-link-item>
        <multi-menu-link-item href="https://kanbanflow.com/board/a6a2c3aa67d9492ac64007975f9f322a">Kanban Flow</multi-menu-link-item>
        <multi-menu-link-item href="https://www.npmjs.com/search?q=%40trevorism">NPM</multi-menu-link-item>
        <multi-menu-link-item href="https://console.cloud.google.com">Google Cloud</multi-menu-link-item>
        <multi-menu-link-item href="https://admin.google.com/u/1/?pli=1">Google Apps</multi-menu-link-item>
      </multi-menu-link>
    </div>
    <div class="tism-menuItem">
      <menu-link href="/admin" v-if="admin">Admin</menu-link>
    </div>
    <span v-if="!authenticated">
      <div class="tism-menuItem rightJustify">
        <menu-button href="/login" color="white">Login</menu-button>
      </div>
      <div class="tism-menuItem rightJustify">
        <menu-button href="/register">Register</menu-button>
      </div>
    </span>
    <span v-else>
      <div class="tism-menuItem rightJustify">
        <menu-button href="/logout">Logout</menu-button>
      </div>
      <div class="tism-menuItem rightJustify">
        <menu-button href="/account">Account</menu-button>
      </div>
    </span>
  </div>
</template>

<style scoped>

.tism-menuItem {
  display: inline-block;
  height: 46px;
  vertical-align: middle;
}

.rightJustify {
  float: right;
}

.navBar {
  height: 46px;
  width: 100%;
  background-color: black;
}

.logo-image {
  padding-right: 20px;
  margin-top: 10px;
}

.header-icon {
  background-color: black;
}
</style>
