import express from "express";
import ViteExpress from "vite-express";

import { Achievement, Categorie, User, UserAchievement } from "../db";
import Group from "../db/model/Group.model";
import { calculateAchievementsForUser } from "../utils/calculus";

const app = express();

app.get("/api/users", async (_req, resp) => {
  const users = await User.findAll();
  return resp.status(200).json(users);
});

app.get("/api/groups", async (_req, resp) => {
  const groups = await Group.findAll({
    include: Categorie,
    order: [["order", "ASC"]],
  });
  return resp.status(200).json(groups);
});

app.get("/api/achievements", async (req, resp) => {
  const category = parseInt(req.query.category as string);
  if (category) {
    const achievements = await Achievement.findAll({
      where: { categorieId: category },
      order: [["name", "ASC"]],
      include: {
        model: UserAchievement,
      },
    });
    console.log(achievements);
    return resp.status(200).json(achievements);
  }
});

app.get("/api/getAchievementsPointsForUser", async (req, resp) => {
  try {
    console.log(req.query);
    const userName = req.query.userName as string;
    const points = await calculateAchievementsForUser(userName);
    return resp.status(200).json(points);
  } catch (error: any) {
    console.error(error);
    if (error.message === "User not found") {
      return resp.status(404).json({ message: "User not found" });
    }
    return resp.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/debug", async (_req, resp) => {
  console.log("debug");
  const achievement = await Achievement.findByPk(5577);
  const plop = {
    ...achievement?.dataValues,
    ...JSON.parse(achievement?.raw as string),
  };
  const users = await UserAchievement.findAll({
    where: { achievementId: 5577 },
  });
  plop.users = users;
  return resp.status(200).json(plop);
});

ViteExpress.listen(app, 5174, () =>
  console.log("Server is listening on port 5174...")
);
