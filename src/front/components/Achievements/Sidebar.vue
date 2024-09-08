<script setup lang="ts">
import { useAchievementsStore } from "../../stores/achievements";
import { StyleValue } from "vue";

const achievStore = useAchievementsStore();

const divStyle: StyleValue = {
  textAlign: "left",
  paddingLeft: "0.5rem",
  textWrap: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
};

const handleSelectCategory = (idGroup: string, idCategory: number) => {
  achievStore.getAchievements(idGroup, idCategory);
};
</script>

<template>
  <div :style="{ height: '100%', overflowY: 'scroll' }">
    <div v-for="group in achievStore.groups" :key="group.id">
      <div
        @click="group.opened = !group.opened"
        :title="group.name"
        :style="divStyle"
      >
        {{ group.name }}
      </div>
      <div v-if="group.opened" :style="{ paddingLeft: '1rem' }">
        <div
          v-for="category in group.categories"
          :key="category.id"
          :style="{ ...divStyle, color: category.selected ? 'red' : 'black' }"
          @click="handleSelectCategory(group.id, category.id)"
        >
          {{ category.name }}
        </div>
      </div>
    </div>
  </div>
</template>
