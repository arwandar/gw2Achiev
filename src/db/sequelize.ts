import { Sequelize } from "sequelize";
import cls from "cls-hooked";

const namespace = cls.createNamespace("namespace");
Sequelize.useCLS(namespace);

const sequelize = new Sequelize(
  process.env.DB_NAME || "",
  process.env.DB_USER || "",
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    logging: false,
    port: Number(process.env.DB_PORT) || 3306,
  }
);

export const reinitDB = async () => {
  await sequelize.drop();
  await sequelize.sync({ force: true });
  console.log("DB reinitialized", new Date());
};

export default sequelize;
