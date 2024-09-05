import { CategorieAttributes, CategorieInput } from "../../utils/type";
import { DataTypes, Model } from "sequelize";

import sequelize from "../sequelize";

class Categorie
  extends Model<CategorieAttributes, CategorieInput>
  implements CategorieAttributes
{
  declare id: number;
  declare name: string;
  declare description: string;
  declare order: number;
  declare icon: string;
}

Categorie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    order: DataTypes.INTEGER,
    icon: DataTypes.STRING,
  },
  { sequelize }
);

export default Categorie;