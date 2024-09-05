import { Achievement, Categorie } from "../db";

import { reinitDB } from "../db/sequelize";
import { updateAchievs } from "./achievement";
import { updateCats } from "./categorie";
import { updateUsers } from "./user";

try {
  await reinitDB();
  // await updateAchievs();
  // await updateCats();
  // const cat = await Achievement.findByPk(101, { include: Categorie });

  await updateUsers();
} catch (error) {
  console.error(error);
}
