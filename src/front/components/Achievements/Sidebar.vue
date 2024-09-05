<script setup lang="ts">
import { useAchievementsStore } from "../../stores/achievements";

const achievStore = useAchievementsStore();
</script>

<template>
  <div :style="{ height: '100%', overflowY: 'scroll' }">
    <div v-for="cat in achievStore.categories" :key="cat.id">
      {{ cat.name }}
    </div>
  </div>
</template>
