import { DataTypes, Model } from "sequelize";

import { AchievementAttributes, AchievementInput } from "../../utils/type";
import sequelize from "../sequelize";
import Categorie from "./Categorie.model";

class Achievement
  extends Model<AchievementAttributes, AchievementInput>
  implements AchievementAttributes
{
  declare id: number;
  declare name: string;
  declare description: string;
  declare requirement: string;
  declare categorieId: number;
  declare raw: string;
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
    raw: DataTypes.TEXT,
  },
  { sequelize, name: { singular: "achievement", plural: "achievements" } }
);

export default Achievement;
