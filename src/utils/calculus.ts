import { Achievement, Categorie, Group, User, UserAchievement } from "../db";

let debugAch = false;
let debugCat = false;
let debugGroup = false;

const calculateAchievementById = async (
  userName: string,
  achievement: number | Achievement
) => {
  let points = 0;
  try {
    const ach =
      typeof achievement === "number"
        ? await Achievement.findByPk(achievement)
        : achievement;

    const userAchievement = await UserAchievement.findOne({
      where: { userName, achievementId: ach?.id },
    });

    if (ach && userAchievement) {
      const realAch = JSON.parse(ach.raw);
      if (debugAch) console.log(realAch, userAchievement.dataValues);

      if (userAchievement.repeated) {
        for (const tiers of realAch.tiers) {
          points += tiers.points * userAchievement.repeated;
        }
      }
      if (debugAch) console.log("points after repeated", points);

      for (const tier of realAch.tiers) {
        if (tier.count <= (userAchievement.current || 0)) {
          points += tier.points;
        }
      }

      if (debugAch) console.log("points after tier", points);

      points = Math.min(
        !realAch.point_cap || realAch.point_cap === -1
          ? Infinity
          : realAch.point_cap,
        points
      );

      if (debugAch) console.log("ACH", ach?.name, points);
    }
    return points;
  } catch (error) {
    console.error(error);
    return points;
  }
};

const calcultateAchievementsByCategory = async (
  userName: string,
  categorieId: number
) => {
  try {
    const category = await Categorie.findByPk(categorieId);

    const achievements = await Achievement.findAll({
      where: { categorieId: categorieId },
    });

    const points = await Promise.all(
      achievements.map((achievement) =>
        calculateAchievementById(userName, achievement.id)
      )
    );
    const total = points.reduce((a, b) => a + b, 0);

    if (debugCat) console.log("CAT", category?.name, total);
    return total;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

// @ts-ignore
const calcultateAchievementsByGroup = async (
  userName: string,
  groupId: string
) => {
  let total = 0;
  try {
    const group = await Group.findByPk(groupId);

    const categories = await Categorie.findAll({
      where: { groupId: groupId },
    });

    const points = await Promise.all(
      categories.map((category) =>
        calcultateAchievementsByCategory(userName, category.id)
      )
    );
    total = points.reduce((a, b) => a + b, 0);

    if (debugGroup) console.log("GROUP", group?.name, total);

    return total;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

const calculateAchievementsForUser = async (name: string) => {
  const user = await User.findOne({ where: { name } });
  if (!user) throw new Error("User not found");

  const groups = await Group.findAll();

  const points = await Promise.all(
    groups.map((group) => calcultateAchievementsByGroup(name, group.id))
  );

  const permanentTotal = points.reduce((a, b) => a + b, 0);
  console.log("TOTAL PERMANENT", permanentTotal);
  console.log("DAILY", user.dailyAchievementPoints);
  console.log("MONTHLY", user.monthlyAchievementPoints);

  return (
    permanentTotal + user.dailyAchievementPoints + user.monthlyAchievementPoints
  );
};

debugGroup = true;

export { calculateAchievementsForUser };
