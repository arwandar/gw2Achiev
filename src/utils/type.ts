import { Optional } from "sequelize";

/**
 * ACHIEVEMENT
 */

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
  userAchievements?: UserAchievementAttributes[];
}
export interface AchievementInput {}
export interface AchievementOuput extends Required<AchievementAttributes> {}

/**
 * CATEGORIE
 */

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
  groupId?: string;
  selected?: boolean;
}
export interface CategorieInput {}
export interface CategorieOuput extends Required<CategorieAttributes> {}

/**
 * GROUP
 */

export type GroupApi = {
  id: string;
  name: string;
  description: string;
  order: number;
  categories: number[];
};

export interface GroupAttributes {
  id: string;
  name: string;
  description: string;
  order: number;
  categories?: CategorieAttributes[];
  opened?: boolean;
}
export interface GroupInput {}
export interface GroupOuput extends Required<GroupAttributes> {}

/**
 * USER
 */

export interface UserAttributes {
  name: string;
  token: string;
}
export interface UserInput {}
export interface UserOuput extends Required<UserAttributes> {}

/**
 * USER ACHIEVEMENT
 */

export type UserAchievementApi = {
  id: number;
  done: boolean;
  unlocked?: boolean;
  max?: number;
  current?: number;
  repeated?: number;
};

export interface UserAchievementAttributes {
  id: number;
  userName?: string;
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
