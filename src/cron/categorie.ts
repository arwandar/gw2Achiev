import { CategorieApi } from "../utils/type";
import { addCategorie } from "../db/utils";

export const getIds = async () => {
  const uri = `https://api.guildwars2.com/v2/achievements/categories`;
  const res = await fetch(uri).then((res) => res.json());
  return res;
};

export const updateCats = async () => {
  const ids = await getIds();

  const result: CategorieApi[] = await getRecCats(ids);

  for (const item of result) {
    await addCategorie(item);
  }
};

const getRecCats = async (ids: number[]) => {
  let currentsIds = [...ids];
  let result: CategorieApi[] = [];
  // do {
  console.log("Not done:", currentsIds.length);
  try {
    const tmp = await getCats(currentsIds.splice(0, 200));
    result = [...result, ...tmp];
  } catch (error) {
    console.log(error);
  }
  // } while (currentsIds.length > 0);

  return result;
};

const getCats = async (ids: number[]) => {
  const uri = `https://api.guildwars2.com/v2/achievements/categories?ids=${ids.join(
    ","
  )}`;
  const res = await fetch(uri).then((res) => res.json());
  return res;
};
