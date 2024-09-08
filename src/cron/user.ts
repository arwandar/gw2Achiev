import { Achievement, User, UserAchievement } from "../db";

import { getIds } from "./achievement";
import { truncate } from "../db/utils";

export const updateUsers = async () => {
  await truncate(["UserAchievement"]);

  const users = Object.entries(process.env).filter(([key]) =>
    key.startsWith("TOKEN_")
  );

  const ids = await getIds();

  for (const [, value] of users) {
    if (value) await updateUser(value, ids);
  }
};

const getAchievs = async (token: string, ids: number[]) => {
  const url =
    "https://api.guildwars2.com/v2/account/achievements?access_token=";
  const fullUrl = `${url}${token}&ids=${ids.join(",")}`;
  return fetch(fullUrl).then((res) => res.json());
};

export const updateUser = async (token: string, ids: number[]) => {
  const uri = `https://api.guildwars2.com/v2/account?access_token=${token}`;
  const api = await fetch(uri, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => ({
      name: res.name,
      token: token,
    }));

  await User.upsert(api);
  let currentsIds = [...ids];
  do {
    console.log(`${api.name} not done`, currentsIds.length);
    try {
      const userAchievements = await getAchievs(
        token,
        currentsIds.splice(0, 200)
      );
      for (const achievement of userAchievements) {
        const dbAchievement = await Achievement.findByPk(achievement.id);
        if (dbAchievement) {
          await UserAchievement.create({
            userName: api.name,
            achievementId: achievement.id,
            done: achievement.done,
            current: achievement.current,
            unlocked: achievement.unlocked,
            max: achievement.max,
            repeated: achievement.repeated,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  } while (currentsIds.length > 0);
};
