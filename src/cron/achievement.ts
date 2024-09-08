import { addAchievement } from "../db/utils";

export const getIds = async () => {
  const uri = `https://api.guildwars2.com/v2/achievements`;
  const res = await fetch(uri).then((res) => res.json());
  return res;
};

export const updateAchievs = async () => {
  const ids: number[] = await getIds();

  let currentsIds = [...ids];
  do {
    console.log("Achievements not done:", currentsIds.length);
    try {
      const achievements = await getAchievs(currentsIds.splice(0, 200));
      for (const achievement of achievements) {
        addAchievement(achievement);
      }
    } catch (error) {
      console.log(error);
    }
  } while (currentsIds.length > 0);
};

const getAchievs = async (ids: number[]) => {
  const uri = `https://api.guildwars2.com/v2/achievements?ids=${ids.join(",")}`;
  const res = await fetch(uri).then((res) => res.json());
  return res;
};
