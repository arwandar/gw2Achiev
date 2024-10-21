import { DataTypes, Model } from "sequelize";

import {
  UserAchievementAttributes,
  UserAchievementInput,
} from "../../utils/type";
import sequelize from "../sequelize";
import Achievement from "./Achievement.model";
import User from "./User.model";

class UserAchievement
  extends Model<UserAchievementAttributes, UserAchievementInput>
  implements UserAchievementAttributes
{
  declare id: number;
  declare userName?: string;
  declare achievementId?: number;
  declare done: boolean;
  declare unlocked?: boolean;
  declare max?: number;
  declare current?: number;
  declare repeated?: number;
}

UserAchievement.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: User,
        key: "name",
      },
    },
    achievementId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Achievement,
        key: "id",
      },
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    unlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    max: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    current: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    repeated: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    name: { singular: "userAchievement", plural: "userAchievements" },
  }
);

export default UserAchievement;
