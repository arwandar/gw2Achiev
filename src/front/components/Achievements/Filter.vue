<script setup lang="ts">
defineProps<{
  currentFilter: "all" | "arwy" | "japyx" | "nobody";
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
      @click="$emit('filter', 'arwy')"
      :class="{ active: currentFilter == 'arwy' }"
    >
      ARWY
    </button>
    <button
      @click="$emit('filter', 'japyx')"
      :class="{ active: currentFilter == 'japyx' }"
    >
      JAPYX
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
