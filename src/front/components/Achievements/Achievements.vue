<script setup lang="ts">
import { computed } from "vue";
import { useAchievementsStore } from "../../stores/achievements";

import { AchievementOuput, UserAchievementOuput } from "../../../utils/type";

const achievStore = useAchievementsStore();

const props = defineProps<{
  filter: string;
}>();

const list = computed(() => {
  let localList = [...achievStore.achievements];
  if (props.filter === "nobody")
    return localList.filter((ach) =>
      ach.userAchievements?.every((userAch) => !userAch.done)
    );
  if (props.filter === "all") return localList;
  const userName = props.filter;
  return localList.filter(
    (ach) =>
      ach.userAchievements?.every((userAch) =>
        userAch.userName === userName ? userAch.done : !userAch.done
      ) &&
      ach.userAchievements?.some((userAch) => userAch.userName === userName)
  );
});

const getColor = (ach: any) => {
  const userDone = ach.userAchievements?.filter(
    (userAch: UserAchievementOuput) => userAch.done
  );

  if (userDone?.length == 0) return "grey";
  if (userDone?.length == achievStore.users.length) return "black";

  return achievStore.users.find((user) => user.name == userDone[0].userName)
    ?.color;
};

const getTitle = (ach: AchievementOuput) => {
  return [
    ach.description,
    ach.userAchievements?.map(
      (userAch) => `${userAch.userName}: ${userAch.done}`
    ),
  ].join("\n");
};

const getText = (ach: AchievementOuput) => `${ach.id} - ${ach.name}`;

const handleDebug = (ach: AchievementOuput) => {
  console.log(ach);
};
</script>

<template>
  <div :class="{ 'achievements-container': true }">
    <div
      v-for="achievement in list"
      @click="handleDebug(achievement)"
      :key="achievement.id"
      :class="{
        cell: true,
      }"
      :title="getTitle(achievement)"
    >
      <span
        :class="{ cell__text: true }"
        :style="{ color: getColor(achievement) }"
        >{{ getText(achievement) }}</span
      >
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
}

.cell__text {
  padding: 0 1em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
