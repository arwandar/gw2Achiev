import { addGroup } from "../db/utils";

export const getIds = async () => {
  const uri = `https://api.guildwars2.com/v2/achievements/groups`;
  const res = await fetch(uri).then((res) => res.json());
  return res;
};

export const updateGroups = async () => {
  const ids: number[] = await getIds();

  let currentsIds = [...ids];
  do {
    console.log("Groups not done:", currentsIds.length);
    try {
      const groups = await getGroups(currentsIds.splice(0, 200));
      for (const group of groups) {
        addGroup(group);
      }
    } catch (error) {
      console.log(error);
    }
  } while (currentsIds.length > 0);
};

const getGroups = async (ids: number[]) => {
  const idsStr = ids.join(",");
  const uri = `https://api.guildwars2.com/v2/achievements/groups?ids=${idsStr}&lang=fr`;
  const res = await fetch(uri).then((res) => res.json());
  return res;
};
