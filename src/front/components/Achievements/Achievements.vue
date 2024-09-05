<script setup lang="ts">
import { computed } from "vue";
import { useAchievementsStore } from "../../stores/achievements";

const achievStore = useAchievementsStore();

const props = defineProps<{
  filter: "all" | "arwy" | "japyx" | "nobody";
}>();

const list = computed(() => {
  let tmpList = [...achievStore.listWithUserDone];
  switch (props.filter) {
    case "arwy":
      tmpList = achievStore.listWithUserDone.filter((item) => item.arwyDone);
      break;
    case "japyx":
      tmpList = achievStore.listWithUserDone.filter((item) => item.japyxDone);
      break;
    case "nobody":
      tmpList = achievStore.listWithUserDone.filter(
        (item) => !item.arwyDone && !item.japyxDone
      );
      break;
  }
  return tmpList;
});
</script>

<template>
  <div :class="{ 'achievements-container': true }">
    <div
      v-for="achievement in list"
      :key="achievement.id"
      :class="{
        cell: true,
        arwy: achievement.arwyDone,
        japyx: achievement.japyxDone,
      }"
      :title="achievement.description"
    >
      <span :class="{ cell__text: true }">{{ achievement.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.achievements-container {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-auto-rows: 2em;
  gap: 5px 5px;
  grid-auto-flow: row;
  padding: 1rem;
  overflow-y: scroll;
  height: 100%;
}

.cell {
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;

  /* text-wrap: nowrap; */
}
.cell__text {
  padding: 0 1em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.arwy {
  color: red;
}

.japyx {
  color: blue;
}

.arwy.japyx {
  color: purple;
}
</style>
