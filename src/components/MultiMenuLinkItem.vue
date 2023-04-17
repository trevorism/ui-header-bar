<script setup>

defineProps({
  href: {
    type: String,
    required: true
  }
});

</script>

<template>
  <div class="tism-menuLinkItem">
    <a class="tism-menuLinkItemLink" :href="href"><slot></slot></a>
  </div>
</template>


<style scoped>
.tism-menuLinkItem{
  display:block;
  padding: 10px;
  width:100%;
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