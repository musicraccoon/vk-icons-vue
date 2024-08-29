<template>
  <div>
    <Component v-for="icon in icons" :is="icon" />
  </div>
</template>

<script setup lang="ts">
import * as icons from "@musicraccoon/vk-icons-vue";
</script>

<style scoped></style>
