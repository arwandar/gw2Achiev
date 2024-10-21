import { reinitDB } from "../db/sequelize";
import { updateAchievs } from "./achievement";
import { updateCats } from "./categorie";
import { updateGroups } from "./group";
import { updateUsers } from "./user";

try {
  await reinitDB();
  await updateAchievs();
  await updateCats();
  await updateGroups();
  await updateUsers();
} catch (error) {
  console.error(error);
}
