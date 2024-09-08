import { DataTypes, Model } from "sequelize";
import { UserAttributes, UserInput } from "../../utils/type";

import sequelize from "../sequelize";

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  declare name: string;
  declare token: string;
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    token: DataTypes.STRING,
  },

  { sequelize }
);

export default User;
