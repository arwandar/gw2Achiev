<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAchievementsStore } from "./stores/achievements";
import Filter from "./components/Achievements/Filter.vue";
import Sidebar from "./components/Achievements/Sidebar.vue";
import Achievements from "./components/Achievements/Achievements.vue";

const achievStore = useAchievementsStore();

onMounted(() => {
  achievStore.init();
});

const filter = ref<"arwy" | "japyx" | "nobody" | "all">("all");
</script>

<template>
  <div class="container">
    <div :class="{ sidebar: true }"><Sidebar /></div>
    <div :class="{ filter: true }">
      <Filter @filter="filter = $event" :currentFilter="filter" />
    </div>
    <div :class="{ main: true }">
      <Achievements :class="{ achievements: true }" :filter="filter" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 20% 1fr;
  grid-template-rows: max-content 1fr;
  gap: 0;
  grid-auto-flow: row;
  grid-template-areas:
    "sidebar filter"
    "sidebar main";
  overflow: hidden;
  height: 100vh;
  width: 100vw;
}

.sidebar {
  grid-area: sidebar;
  overflow: hidden;
  height: 100%;
}

.filter {
  grid-area: filter;
}

.main {
  grid-area: main;
  overflow: hidden;
  height: 100%;
}
</style>
