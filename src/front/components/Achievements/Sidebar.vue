<script setup lang="ts">
import { CategorieAttributes, GroupAttributes } from "../../../utils/type";
import { useAchievementsStore } from "../../stores/achievements";
import { StyleValue } from "vue";

const achievStore = useAchievementsStore();

const divStyle: StyleValue = {
  textAlign: "left",
  paddingLeft: "0.5rem",
  textWrap: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  display: "flex",
  gap: "0.5rem",
};

const handleSelectCategory = (idGroup: string, idCategory: number) => {
  achievStore.getAchievements(idGroup, idCategory);
};

const copy = (id: string | number) => {
  navigator.clipboard.writeText(typeof id === "string" ? id : id.toString());
};

const getText = (thing: GroupAttributes | CategorieAttributes) =>
  `${thing.id.toString().slice(0, 5)} - ${thing.name}`;
</script>

<template>
  <div :style="{ height: '100%', overflowY: 'scroll' }">
    <div v-for="group in achievStore.groups" :key="group.id">
      <div :title="group.name" :style="divStyle">
        <span @click="copy(group.id)">\o/</span>
        <div @click="group.opened = !group.opened">{{ getText(group) }}</div>
      </div>
      <div v-if="group.opened" :style="{ paddingLeft: '1rem' }">
        <div
          v-for="category in group.categories"
          :key="category.id"
          :style="{ ...divStyle, color: category.selected ? 'red' : 'black' }"
          @click="handleSelectCategory(group.id, category.id)"
        >
          {{ getText(category) }}
        </div>
      </div>
    </div>
  </div>
</template>
