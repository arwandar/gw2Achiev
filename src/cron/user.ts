import { User, UserAchievement } from "../db";

import { truncate } from "../db/utils";

export const updateUsers = async () => {
  const users = Object.entries(process.env).filter(([key]) =>
    key.startsWith("TOKEN_")
  );

  await truncate(["User", "UserAchievement"]);

  for (const [, value] of users) {
    if (value) await updateUser(value);
  }
};

export const updateUser = async (token: string) => {
  const uri = `https://api.guildwars2.com/v2/account?access_token=${token}`;
  const api = await fetch(uri, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => ({
      name: res.name,
    }));

  await User.create(api);
};
