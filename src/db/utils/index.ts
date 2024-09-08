import {
  AchievementApi,
  CategorieApi,
  CategorieInput,
  GroupApi,
} from "../../utils/type";

import Achievement from "../model/Achievement.model";
import Categorie from "../model/Categorie.model";
import Group from "../model/Group.model";
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
  return Achievement.upsert(curatedAchievement);
};

export const addCategorie = async (api: CategorieApi) => {
  const curatedCategorie: CategorieInput = {
    id: api.id,
    name: api.name,
    description: api.description,
    order: api.order,
    icon: api.icon,
  };
  await Categorie.upsert(curatedCategorie);

  for (const id of api.achievements) {
    const achievement = await Achievement.findByPk(id);
    if (achievement) {
      await achievement.update({ categorieId: api.id });
    }
  }
};

export const addGroup = async (api: GroupApi) => {
  const curatedGroup = {
    id: api.id,
    name: api.name,
    description: api.description,
    order: api.order,
  };
  await Group.upsert(curatedGroup);

  for (const id of api.categories) {
    const category = await Categorie.findByPk(id);
    if (category) {
      await category.update({ groupId: api.id });
    }
  }
};
