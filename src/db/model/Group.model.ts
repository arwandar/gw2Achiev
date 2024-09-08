import { DataTypes, Model } from "sequelize";
import { GroupAttributes, GroupInput } from "../../utils/type";

import sequelize from "../sequelize";

class Group
  extends Model<GroupAttributes, GroupInput>
  implements GroupAttributes
{
  declare id: string;
  declare name: string;
  declare description: string;
  declare order: number;
}

Group.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    order: DataTypes.INTEGER,
  },
  { sequelize }
);

export default Group;
