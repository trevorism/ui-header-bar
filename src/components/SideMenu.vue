<script setup>
defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const useRouter = (link) => {
  return link.startsWith("/");
};
</script>

<template>
  <va-sidebar width="100%" hover-color="Shadow">
    <div v-for="item in data" :key="item.id">
      <h2>{{ item.name }}</h2>

      <div v-if="item.hasOwnProperty('children')">
        <div v-for="child in item.children" :key="child.name">
          <va-sidebar-item :href="child.link" v-if="!useRouter(child.link)">
            <va-sidebar-item-content>
              {{ child.name }}
            </va-sidebar-item-content>
          </va-sidebar-item>
          <va-sidebar-item :to="child.link" v-if="useRouter(child.link)">
            <va-sidebar-item-content>
              {{ child.name }}
            </va-sidebar-item-content>
          </va-sidebar-item>
        </div>
      </div>
      <div v-if="!item.hasOwnProperty('children')">
        <va-sidebar-item :href="item.link" v-if="!useRouter(item.link)">
          <va-sidebar-item-content>
            {{ item.name }}
          </va-sidebar-item-content>
        </va-sidebar-item>
        <va-sidebar-item :to="item.link" v-if="useRouter(item.link)">
          <va-sidebar-item-content>
            {{ item.name }}
          </va-sidebar-item-content>
        </va-sidebar-item>
      </div>
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
