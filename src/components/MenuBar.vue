<template>
  <va-navbar v-bind="blackColor" class="header" style="height: 70px">
    <template #left>
      <div style="width: 160px; margin-top: 5px">
        <va-navbar-item>
          <a href="https://trevorism.com">
            <img src="../assets/TrevorismLogo.png" alt="Trevorism" class="logo-image" />
          </a>
        </va-navbar-item>
      </div>
      <va-navbar-item v-bind:key="item.name" v-for="item in leftMenuBar">
        <div v-if="item.hasOwnProperty('children')">
          <va-button-dropdown :label="item.name">
            <multi-menu-link-item
              v-bind:key="child.name"
              v-for="child in item.children"
              :href="child.link"
              :useRouter="useRouter(child.link)">
              {{ child.name }}
            </multi-menu-link-item>
          </va-button-dropdown>
        </div>
        <div v-else>
          <va-button v-if="item.action" @click="item.action()">
            {{ item.name }}
          </va-button>
          <va-button v-else-if="useRouter(item.link)" :to="item.link">
            {{ item.name }}
          </va-button>
          <va-button v-else :href="item.link">
            {{ item.name }}
          </va-button>
        </div>
      </va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item v-bind:key="item.name" v-for="item in rightMenuBar">
        <div v-if="item.hasOwnProperty('children')">
          <va-button-dropdown :label="item.name">
            <multi-menu-link-item
              v-bind:key="child.name"
              v-for="child in item.children"
              :href="child.link"
              :useRouter="useRouter(child.link)">
              {{ child.name }}
            </multi-menu-link-item>
          </va-button-dropdown>
        </div>
        <div v-else>
          <va-button v-if="item.action" @click="item.action()">{{ item.name }} </va-button>
          <va-button v-else-if="useRouter(item.link)" :to="item.link">{{ item.name }} </va-button>
          <va-button v-else :href="item.link">{{ item.name }} </va-button>
        </div>
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
import { computed, onMounted, ref } from "vue";
import { ensureBootstrapped, useAuth } from "@trevorism/ui-auth";

const HOMEPAGE_HOSTS = ["trevorism.com", "www.trevorism.com"];
const READY_TIMEOUT_MILLIS = 1500;

const props = defineProps({
  local: {
    type: Boolean,
    required: false,
    default: null,
  },
});

const { user, isAuthenticated, isAdmin, ready, login, logout } = useAuth();

const blackColor = { color: "#000000" };
const authenticated = isAuthenticated;
const username = computed(() => user.value?.username ?? "");

onMounted(() => {
  ensureBootstrapped();
});

const onHomepage =
  typeof window !== "undefined" && HOMEPAGE_HOSTS.includes(window.location.hostname);

const relativeLinks = computed(() => (props.local === null ? onHomepage : props.local));

const link = (path) => {
  return relativeLinks.value ? path : "https://trevorism.com" + path;
};

const useRouter = (link) => {
  return typeof link === "string" && link.startsWith("/");
};

const apps = {
  name: "Apps",
  children: [
    { name: "Home", link: link("/") },
    { name: "Service Registry", link: "https://active.project.trevorism.com" },
    { name: "Health Dashboard", link: "https://health-dash.testing.trevorism.com" },
    { name: "Changelog", link: "https://changelog.project.trevorism.com" },
    { name: "Timeline Generator", link: "https://timeline.draw.trevorism.com" },
    { name: "Ask a question", link: "https://prompt.action.trevorism.com" },
    { name: "Crypto Charts", link: "https://candlebot.trade.trevorism.com" },
    { name: "Crypto Payments", link: "https://billing.trade.trevorism.com" },
    { name: "Memowand", link: "https://memowand.com" },
  ],
};
const articles = {
  name: "Articles",
  children: [
    { name: "Trevorism Documentation", link: link("/docs") },
    {
      name: "Prototype Driven Development 05/2013",
      link: link("/articles/prototype"),
    },
    { name: "Technology Trends 02/2018", link: link("/articles/trends") },
    {
      name: "Productionalized Service 02/2018",
      link: link("/articles/production"),
    },
    {
      name: "Scientific Improvement 12/2020",
      link: link("/articles/improvement"),
    },
  ],
};

const contact = { name: "Contact", link: link("/contact") };
const tools = {
  name: "Tools",
  children: [
    { name: "Github", link: "https://github.com/trevorism" },
    {
      name: "Kanban Flow",
      link: "https://kanbanflow.com/board/a6a2c3aa67d9492ac64007975f9f322a",
    },
    { name: "NPM", link: "https://www.npmjs.com/search?q=%40trevorism" },
    { name: "Google Cloud", link: "https://console.cloud.google.com" },
    { name: "Google Apps", link: "https://admin.google.com/u/1/?pli=1" }
  ],
};

const admin = { name: "Admin", link: "https://admin.auth.trevorism.com" };
const register = { name: "Register", link: link("/register") };
const startLogin = async () => {
  await Promise.race([ready, new Promise((resolve) => setTimeout(resolve, READY_TIMEOUT_MILLIS))]);
  if (!isAuthenticated.value) {
    login();
  }
};

const signOut = { name: "Logout", action: () => logout() };
const account = computed(() => {
  return { name: username.value, link: link("/account") };
});

const leftMenuBar = computed(() => {
  let arr = [apps, articles, contact];

  if (authenticated.value) {
    arr.push(tools);
  }

  if (isAdmin.value) {
    arr.push(admin);
  }
  return arr;
});

let rightMenuBar = computed(() => {
  let arr = [register, { name: "Login", action: startLogin }];
  if (authenticated.value) {
    arr = [account.value, signOut];
  }
  return arr;
});

const allMenuOptions = computed(() => {
  let arr = leftMenuBar.value;
  return [].concat(arr, [{ name: "Account", children: rightMenuBar.value }]);
});

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
