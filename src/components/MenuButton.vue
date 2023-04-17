<script setup>
defineProps({
  href: {
    type: String,
    required: false,
  },
});
</script>

<template>

  <div class="tism-menuButton">
    <a :href="href"><slot></slot></a>
  </div>
</template>

<style scoped>
.tism-menuButton {
  display: inline-block;
  margin-right: 30px;

  width: 100%;
}

.tism-menuButton a {
  display: inline-flex;
  position: relative;
  vertical-align: top;
  color: white;
  background-color: #00A2E8;
  cursor: pointer;
  -webkit-box-pack: center;
  text-align: center;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: 4px;
  margin: 4px;
  padding: 10px;
  text-decoration: none;
}

.tism-menuButton a:hover {
  color: white;
  background-color: #0198d9;
  cursor: pointer;
}
</style>
