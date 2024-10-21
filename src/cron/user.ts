import { Achievement, User, UserAchievement } from "../db";
import { truncate } from "../db/utils";
import { UserAttributes } from "../utils/type";
import { getIds } from "./achievement";

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
  const url = "https://api.guildwars2.com/v2/account/achievements";
  const fullUrl = `${url}?access_token=${token}&ids=${ids.join(",")}`;
  return fetch(fullUrl).then((res) => res.json());
};

const stringToColor = (string: string, saturation = 100, lightness = 75) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  return `hsl(${hash % 360}, ${saturation}%, ${lightness}%)`;
};
export const updateUser = async (token: string, ids: number[]) => {
  const uri = `https://api.guildwars2.com/v2/account?access_token=${token}`;
  const api: UserAttributes = await fetch(uri, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => ({
      name: res.name,
      token: token,
      color: stringToColor(res.name),
      dailyAchievementPoints: res.daily_ap,
      monthlyAchievementPoints: res.monthly_ap,
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
