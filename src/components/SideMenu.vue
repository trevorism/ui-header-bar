<script setup>
defineProps({
  data: {
    type: Array,
    required: true
  },
  local: {
    type: Boolean,
    required: false,
    default: false
  }
});

</script>

<template>
  <va-sidebar width="100%" hover-color="Shadow">
    <div v-for="item in data" :key="item.id">
      <h2>{{ item.name }}</h2>
      <div v-if="item.hasOwnProperty('children')">
        <va-sidebar-item v-for="child in item.children" :key="child.name" :href="child.link">
          <va-sidebar-item-content>
            {{ child.name }}
          </va-sidebar-item-content>
        </va-sidebar-item>
      </div>
      <va-sidebar-item v-else :href="item.link">
        <va-sidebar-item-content>
          {{ item.name }}
        </va-sidebar-item-content>
      </va-sidebar-item>
    </div>
  </va-sidebar>
</template>

<style scoped>
.va-sidebar__item__content {
  --va-sidebar-item-content-padding: 1em;
  min-height: 20px;
  height: 20px;
}
</style>