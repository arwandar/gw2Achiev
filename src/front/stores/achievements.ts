import {
  AchievementAttributes,
  GroupAttributes,
  UserAttributes,
} from "../../utils/type";
import { acceptHMRUpdate, defineStore } from "pinia";

import _apiAchievements from "../jsonData/achiev.json";
import _apiArwy from "../jsonData/arwyAchiev.json";
import _apiJapyx from "../jsonData/japyxAchiev.json";

export const useAchievementsStore = defineStore({
  id: "achievements",
  state: () => ({
    groups: [] as GroupAttributes[],
    achievements: [] as AchievementAttributes[],
    users: [] as UserAttributes[],
  }),

  getters: {},

  actions: {
    async init() {
      this.groups = await fetch("/api/groups").then((res) => res.json());
      this.users = await fetch("/api/users").then((res) => res.json());
    },
    async getAchievements(idGroup: string, idCategory: number) {
      const groups = this.groups.map((group) =>
        group.id === idGroup
          ? {
              ...group,
              categories: group.categories?.map((category) => ({
                ...category,
                selected: category.id === idCategory,
              })),
            }
          : group
      );
      this.groups = groups;

      this.achievements = await fetch(
        "/api/achievements?category=" + idCategory
      ).then((res) => res.json());
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useAchievementsStore, import.meta.hot)
  );
}
