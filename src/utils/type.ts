import { Optional } from "sequelize";

export type AchievementApi = {
  id: number;
  name: string;
  description: string;
  requirement: string;
};

export interface AchievementAttributes {
  id: number;
  name: string;
  description: string;
  requirement: string;
  categorieId?: number;
}
export interface AchievementInput
  extends Optional<AchievementAttributes, "id"> {}
export interface AchievementOuput extends Required<AchievementAttributes> {}

export type CategorieApi = {
  id: number;
  name: string;
  description: string;
  order: number;
  icon: string;
  achievements: number[];
};

export interface CategorieAttributes {
  id: number;
  name: string;
  description: string;
  order: number;
  icon: string;
}
export interface CategorieInput extends Optional<CategorieAttributes, "id"> {}
export interface CategorieOuput extends Required<CategorieAttributes> {}

export interface UserAttributes {
  id: number;
  name: string;
}
export interface UserInput extends Optional<UserAttributes, "id"> {}
export interface UserOuput extends Required<UserAttributes> {}

export interface UserAchievementAttributes {
  id: number;
  userId?: number;
  achievementId?: number;
  done: boolean;
  unlocked?: boolean;
  max?: number;
  current?: number;
  repeated?: number;
}
export interface UserAchievementInput
  extends Optional<UserAchievementAttributes, "id"> {}
export interface UserAchievementOuput
  extends Required<UserAchievementAttributes> {}
