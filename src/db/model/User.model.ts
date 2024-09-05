import { DataTypes, Model } from "sequelize";
import { UserAttributes, UserInput } from "../../utils/type";

import sequelize from "../sequelize";

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  declare id: number;
  declare name: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  },
  { sequelize }
);

export default User;
