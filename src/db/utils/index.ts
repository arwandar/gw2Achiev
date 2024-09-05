import {
  AchievementApi,
  CategorieApi,
  CategorieInput,
  CategorieOuput,
} from "../../utils/type";

import Achievement from "../model/Achievement.model";
import Categorie from "../model/Categorie.model";
import User from "../model/User.model";
import UserAchievement from "../model/UserAchievement.model";
import sequelize from "../sequelize";

export const truncate = async (models: string[]) => {
  await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true });
  for (const model of models) {
    switch (model) {
      case "Achievement":
        await Achievement.truncate();
        break;
      case "Categorie":
        await Categorie.truncate();
        break;
      case "User":
        await User.truncate();
        break;
      case "UserAchievement":
        await UserAchievement.truncate();
        break;
    }
  }
  await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", { raw: true });
};

export const addAchievement = async (api: AchievementApi) => {
  const curatedAchievement = {
    id: api.id,
    name: api.name,
    description: api.description,
    requirement: api.requirement,
  };
  return Achievement.create(curatedAchievement);
};

export const addCategorie = async (api: CategorieApi) => {
  const curatedCategorie: CategorieInput = {
    id: api.id,
    name: api.name,
    description: api.description,
    order: api.order,
    icon: api.icon,
  };
  const cat: CategorieOuput = await Categorie.create(curatedCategorie);

  for (const id of api.achievements) {
    const achievement = await Achievement.findByPk(id);
    if (achievement) {
      await achievement.update({ categorieId: cat.id });
    }
  }
};
