import { AchievementAttributes, AchievementInput } from "../../utils/type";
import { DataTypes, Model } from "sequelize";

import Categorie from "./Categorie.model";
import sequelize from "../sequelize";

class Achievement
  extends Model<AchievementAttributes, AchievementInput>
  implements AchievementAttributes
{
  declare id: number;
  declare name: string;
  declare description: string;
  declare requirement: string;
  declare categorieId: number;
}

Achievement.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    requirement: DataTypes.TEXT,
    categorieId: {
      type: DataTypes.INTEGER,
      references: {
        model: Categorie,
        key: "id",
      },
    },
  },
  { sequelize, name: { singular: "achievement", plural: "achievements" } }
);

export default Achievement;
