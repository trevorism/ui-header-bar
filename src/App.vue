<script setup>
import MenuBar from "./components/MenuBar.vue";
</script>

<template>
  <div>
    <MenuBar :local="false"></MenuBar>
    <va-navbar class="flex " center color="#bad2c7" textColor="#000000">
      <va-navbar-item class="navbar-item-slot">
        <h2>Trevorism Timeline</h2>
      </va-navbar-item>
    </va-navbar>
  </div>
</template>
