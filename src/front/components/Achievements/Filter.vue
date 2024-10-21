<script setup lang="ts">
import { useAchievementsStore } from "../../stores/achievements";

const achievStore = useAchievementsStore();

defineProps<{
  currentFilter: string;
}>();
</script>

<template>
  <div :class="{ 'btn-group': true }">
    <button
      @click="$emit('filter', 'all')"
      :class="{ active: currentFilter == 'all' }"
    >
      All
    </button>
    <button
      v-for="user in achievStore.users"
      :key="user.name"
      @click="$emit('filter', user.name)"
      :class="{ active: currentFilter == user.name }"
      :style="{ color: user.color }"
    >
      {{ user.name }}
    </button>
    <button
      @click="$emit('filter', 'nobody')"
      :class="{ active: currentFilter == 'nobody' }"
    >
      Nobody
    </button>
  </div>
</template>

<style scoped>
.btn-group {
  margin: 1rem;
  button {
    border-radius: 0;

    &:first-child {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }

    &:last-child {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
}

.active {
  background-color: #ddddddc0;
}
</style>
