<script setup>
defineProps({
  href: {
    type: String,
    required: true,
  },
  useRouter: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<template>
  <div class="tism-menuLinkItem">
    <a v-if="!useRouter" class="tism-menuLinkItemLink" :href="href"><slot></slot></a>
    <router-link v-if="useRouter" :to="href"><slot></slot></router-link>
  </div>
</template>

<style scoped>
.tism-menuLinkItem {
  display: block;
  padding: 10px;
  width: 100%;
  border-left: #eeeeee solid 1px;
  border-right: #eeeeee solid 1px;
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
