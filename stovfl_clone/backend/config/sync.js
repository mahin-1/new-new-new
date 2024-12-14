import { User } from "../models/usersModel.js";
import { Post } from "../models/postsModel.js";
import { Tag } from "../models/tagsModel.js";
import { Comment } from "../models/commentsModel.js";
import { Vote } from "../models/votesModel.js";
import { Auth } from "../models/authModel.js";
import { sha256 } from "js-sha256";
import { Sequelize, QueryInterface } from "sequelize";

export async function max(table) {
  try {
    max = await table.max("id");
    return max;
  } catch (error) {
    console.error("Lol: ", error);
  }
}

export async function populate_auth() {
  try {
    const people = await User.findAll();
    let i = 0;
    for (i in people) {
      const p = people[i].dataValues;
      let name = p.display_name + "@" + p.id;
      let cd = p.creation_date;
      name = name.replace(/\s+/g, "");
      const newpass = sha256(name + cd);
      await Auth.create({
        id: p.id,
        user_name: name,
        pass: newpass,
      });
    }
    console.log("Finished adding data");
  } catch (error) {
    console.error("Unable to sync database: ", error);
  }
}

export async function synctables() {
  try {
    await User.sync({ alter: true });
    await Post.sync({ alter: true });
    await Comment.sync({ alter: true });
    await Tag.sync({ alter: true });
    await Vote.sync({ alter: true });
    await Auth.sync({ alter: true });
  } catch (error) {
    console.error("Unable to sync database: ", error);
  }
}
