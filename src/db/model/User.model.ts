import { DataTypes, Model } from "sequelize";

import { UserAttributes, UserInput } from "../../utils/type";
import sequelize from "../sequelize";

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  declare name: string;
  declare token: string;
  declare color: string;
  declare dailyAchievementPoints: number;
  declare monthlyAchievementPoints: number;
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    token: DataTypes.STRING,
    color: DataTypes.STRING,
    dailyAchievementPoints: DataTypes.INTEGER,
    monthlyAchievementPoints: DataTypes.INTEGER,
  },

  { sequelize }
);

export default User;
