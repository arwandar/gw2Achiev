import Achievement from "./model/Achievement.model";
import Categorie from "./model/Categorie.model";
import User from "./model/User.model";
import UserAchievement from "./model/UserAchievement.model";

Achievement.belongsTo(Categorie, {
  foreignKey: "categorieId",
});
Categorie.hasMany(Achievement, {
  foreignKey: "categorieId",
});

User.hasMany(UserAchievement, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Achievement.hasMany(UserAchievement, {
  foreignKey: "achievementId",
  onDelete: "CASCADE",
});

UserAchievement.belongsTo(User, {
  foreignKey: "userId",
});
UserAchievement.belongsTo(Achievement, {
  foreignKey: "achievementId",
});

export { default as sequelize } from "./sequelize";
export { Categorie, Achievement, User, UserAchievement };
