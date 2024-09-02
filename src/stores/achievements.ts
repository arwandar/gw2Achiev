import { acceptHMRUpdate, defineStore } from "pinia";

import _apiAchievements from "../jsonData/achiev.json";
import _apiArwy from "../jsonData/arwyAchiev.json";
import _categories from "../jsonData/categories.json";
import _apiJapyx from "../jsonData/japyxAchiev.json";

type Categorie = {
  id: number;
  name: string;
  description: string;
  order: number;
  icon: string;
  achievements: number[];
};

const apiAchievements = _apiAchievements as {
  id: number;
  name: string;
  description: string;
  requirement: string;
}[];

const arwyAchiev = _apiArwy as {
  id: number;
  done: boolean;
  unlocked: boolean;
}[];

const japyxAchiev = _apiJapyx as {
  id: number;
  done: boolean;
  unlocked: boolean;
}[];

const categories = _categories as Categorie[];

export const useAchievementsStore = defineStore({
  id: "achievements",
  state: () => ({
    list: [] as { id: number; name: string; description: string }[],
    categories: categories.filter(
      ({ achievements }) => achievements.length > 0
    ),
    arwyDone: [] as number[],
    japyxDone: [] as number[],
  }),

  getters: {
    listWithUserDone: (state) => {
      return state.list.map((item) => {
        return {
          ...item,
          arwyDone: state.arwyDone.includes(item.id),
          japyxDone: state.japyxDone.includes(item.id),
        };
      });
    },
  },

  actions: {
    init() {
      this.list = apiAchievements.map((item) => ({
        id: item.id,
        name: item.name,
        description: [item.description, item.requirement].join("\n"),
      }));
      this.arwyDone = arwyAchiev.filter(({ done }) => done).map(({ id }) => id);
      this.japyxDone = japyxAchiev
        .filter(({ done }) => done)
        .map(({ id }) => id);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useAchievementsStore, import.meta.hot)
  );
}
