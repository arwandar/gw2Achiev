import { addCategorie } from "../db/utils";

export const getIds = async () => {
  const uri = `https://api.guildwars2.com/v2/achievements/categories`;
  const res = await fetch(uri).then((res) => res.json());
  return res;
};

export const updateCats = async () => {
  const ids = await getIds();

  let currentsIds = [...ids];
  do {
    console.log("Categories not done:", currentsIds.length);
    try {
      const categories = await getCats(currentsIds.splice(0, 200));
      for (const category of categories) {
        addCategorie(category);
      }
    } catch (error) {
      console.log(error);
    }
  } while (currentsIds.length > 0);
};

const getCats = async (ids: number[]) => {
  const uri = `https://api.guildwars2.com/v2/achievements/categories?ids=${ids.join(
    ","
  )}`;
  const res = await fetch(uri).then((res) => res.json());
  return res;
};
