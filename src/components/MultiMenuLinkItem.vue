<script setup>
defineProps({
  href: {
    type: String,
    required: true,
  },
  local: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<template>
  <div class="tism-menuLinkItem">
    <a v-if="!local" class="tism-menuLinkItemLink" :href="href"><slot></slot></a>
    <router-link v-if="local" :to="href"><slot></slot></router-link>
  </div>
</template>

<style scoped>
.tism-menuLinkItem {
  display: block;
  padding: 10px;
  width: 100%;
}

.tism-menuLinkItem:hover {
  background-color: #eeeeee;
  cursor: pointer;
}
.tism-menuLinkItem a {
  display: block;
  color: black;
  text-decoration: none;
}
</style>
