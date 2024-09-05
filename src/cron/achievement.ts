import { AchievementApi } from "../utils/type";
import { addAchievement } from "../db/utils";

export const getIds = async () => {
  const uri = `https://api.guildwars2.com/v2/achievements`;
  const res = await fetch(uri).then((res) => res.json());
  return res;
};

export const updateAchievs = async () => {
  const ids: number[] = await getIds();

  const result = await getRecAchievs(ids);

  for (const item of result) {
    addAchievement(item);
  }
};

const getRecAchievs = async (ids: number[]) => {
  let currentsIds = [...ids];
  let result: AchievementApi[] = [];
  // do {
  console.log("Not done:", currentsIds.length);
  try {
    const tmp = await getAchievs(currentsIds.splice(0, 200));
    result = [...result, ...tmp];
  } catch (error) {
    console.log(error);
  }
  // } while (currentsIds.length > 0);

  return result;
};

const getAchievs = async (ids: number[]) => {
  const uri = `https://api.guildwars2.com/v2/achievements?ids=${ids.join(",")}`;
  const res = await fetch(uri).then((res) => res.json());
  return res;
};
