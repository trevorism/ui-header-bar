<script setup>

import { ref } from "vue";
defineProps({
  label: {
    type: String,
    required: false,
  }
});

const showingMenu = ref(false);

function showMenu() {
  showingMenu.value = !showingMenu.value;
}

function hideMenu() {
  showingMenu.value = false;
}

</script>

<template>
  <div class="tism-multiMenuLink" v-click-away="hideMenu" @click="showMenu" :class="{active: showingMenu}">
    {{ label }}
    &nbsp;
    <div class="dropdownLink">&gt;</div>
  </div>
  <div v-if="showingMenu">
    <div class="dropdownContainer">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.tism-multiMenuLink {
  display: inline-block;
  padding-left: 15px;
  padding-top: 15px;
  margin-right: 30px;
  height: 31px;
  width: 92%;
  color: darkgray;
  background-color: black;
}

.active {
  background-color: white;
}

.tism-multiMenuLink:hover {
  background-color: white;
  cursor: pointer;
  color: #00A2E8;
}

.dropdownLink {
  display: inline-block;
  transform: rotate(-270deg);
  color: #00A2E8;
  font-weight: bolder;
  font-size: 16px;
}

.dropdownContainer{
  display: block;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border-top: 2px solid #dbdbdb;
  position: absolute;
  background-color: white;
  box-shadow: 0 8px 8px rgba(10, 10, 10, 0.1);
  padding-right: 20px;
  z-index: 20;
}
</style>
