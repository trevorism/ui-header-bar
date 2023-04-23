<template>
  <va-navbar v-bind="blackColor" class="header" style="height: 70px">
    <template #left>
      <div style="width: 160px; margin-top:5px">
      <va-navbar-item >
        <a href="https://trevorism.com">
          <img src="../assets/TrevorismLogo.png" alt="Trevorism" class="logo-image" />
        </a>
      </va-navbar-item>
      </div>
      <va-navbar-item v-bind:key="item.name" v-for="item in leftMenuBar">
        <div v-if="item.hasOwnProperty('children')">
          <va-button-dropdown :label="item.name" size="medium" class="mr-2 mb-2">
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
          <va-button v-if="useRouter(item.link)" size="medium" class="mr-2 mb-2" :to="item.link">{{ item.name }} </va-button>
          <va-button v-if="!useRouter(item.link)" size="medium" class="mr-2 mb-2" :href="item.link">{{ item.name }} </va-button>
        </div>
      </va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item v-bind:key="item.name" v-for="item in rightMenuBar">
        <div v-if="item.hasOwnProperty('children')">
          <va-button-dropdown :label="item.name" size="medium" class="mr-2 mb-2">
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
          <va-button v-if="useRouter(item.link)" size="medium" class="mr-2 mb-2" :to="item.link">{{ item.name }} </va-button>
          <va-button v-if="!useRouter(item.link)" size="medium" class="mr-2 mb-2" :href="item.link">{{ item.name }} </va-button>
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
import { useCookies } from "vue3-cookies";

const props = defineProps({
  local: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const { cookies } = useCookies();
const username = ref("null");
const isAdmin = ref(false);
const authenticated = ref(false);
const blackColor = { color: "#000000" };

onMounted(() => {
  username.value = cookies.get("user_name");
  isAdmin.value = cookies.get("admin") === "true";
  authenticated.value = !!username.value;
});

const link = (link) => {
  if (props.local) {
    return link;
  }
  return "https://trevorism.com" + link;
};

const useRouter = (link) => {
  return link.startsWith("/");
};

const apps = {
  name: "Apps",
  children: [
    { name: "Home", link: link("/") },
    { name: "Timeline Generator", link: "https://timeline.draw.trevorism.com" },
    { name: "Service Registry", link: "https://active.project.trevorism.com" },
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
    { name: "Google Apps", link: "https://admin.google.com/u/1/?pli=1" },
  ],
};

const admin = { name: "Admin", link: link("/admin") };
const register = { name: "Register", link: link("/register") };
const login = { name: "Login", link: link("/login") };
const logout = { name: "Logout", link: link("/logout") };
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
  let arr = [register, login];
  if (authenticated.value) {
    arr = [account.value, logout];
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
.va-dropdown__content {
  z-index: 1030;
}

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
