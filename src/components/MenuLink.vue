<script setup>
defineProps({
  href: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div class="tism-menuLink">
    <a :href="href"><slot></slot></a>
  </div>
</template>

<style scoped>
.tism-menuLink {
  display: inline-block;
  padding-top: 15px;
  margin-right: 30px;
  padding-left: 15px;
  height: 31px;
  width: 100%;
  background-color: black;
}

.tism-menuLink:hover {
  background-color: white;
  cursor: pointer;
}

.tism-menuLink a {
  display: block;
  color: darkgray;
  text-decoration: none;
}
.tism-menuLink a:hover {
  color: #00A2E8;
}

</style>
