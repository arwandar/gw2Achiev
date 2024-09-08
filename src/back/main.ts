import { Achievement, Categorie, User, UserAchievement } from "../db";

import Group from "../db/model/Group.model";
import ViteExpress from "vite-express";
import express from "express";

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

ViteExpress.listen(app, 5174, () =>
  console.log("Server is listening on port 5174...")
);
