import Achievement from "./model/Achievement.model";
import Categorie from "./model/Categorie.model";
import Group from "./model/Group.model";
import User from "./model/User.model";
import UserAchievement from "./model/UserAchievement.model";

Achievement.belongsTo(Categorie, {
  foreignKey: "categorieId",
});
Categorie.hasMany(Achievement, {
  foreignKey: "categorieId",
});

Categorie.belongsTo(Group, {
  foreignKey: "groupId",
});
Group.hasMany(Categorie, {
  foreignKey: "groupId",
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
