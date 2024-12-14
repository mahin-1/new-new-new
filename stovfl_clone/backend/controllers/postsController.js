import { Sequelize } from "sequelize";
import { Post } from "../models/postsModel.js";
import { Op } from "sequelize";

export const identity = async (user_name) => {
  let arr = user_name.split("@");
  let iden = "";
  if (arr.length == 2) iden = arr[arr.length - 1];
  else if (arr.length == 1) iden = arr[0];
  return iden;
};
export const createPost = async (req, res) => {
  try {
    if (req.body.body === "" && req.body.title === "") {
      throw { message: "Post cannot be empty" };
    }

    let iden = await identity(req.body.user_name);
    if (iden != req.body.owner_user_id) {
      throw { message: "Different User" };
    }

    let max_val = await Post.max("id");
    req.body.id = 1 + max_val;
    const now = new Date().toISOString();
    req.body.creation_date = now;
    // const threshold = now - 30 * 60 * 1000;

    // const spamcount = await Post.count({
    //   where: {
    //     owner_user_id: req.body.owner_user_id,
    //     creation_date: { [Sequelize.Op.gte]: threshold },
    //   },
    // });

    // if (spamcount > 30) {
    //   res.json({ message: "Spam" });
    //   return;
    // }

    let post = await Post.create(req.body);

    if (post.parent_id !== undefined) {
      await Post.update(
        { last_activity_date: now },
        {
          where: {
            id: post.parent_id,
          },
        }
      );
    }

    res.json({
      message: "Post created",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(post[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const PostsByUser = async (req, res) => {
  try {
    const postlist = await Post.findAll({
      where: {
        owner_user_id: req.params.id,
        post_type_id: req.params.post_type,
      },
      order: [[req.params.sort, req.params.order]],
      attributes: ["id"],
    });
    res.json(postlist);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const PostsByTags = async (req, res) => {
  try {
    console.log(req.params.tags);
    let checker = [
      "[",
      "$",
      "&",
      "+",
      ":",
      ";",
      "=",
      "?",
      "@",
      "#",
      "|",
      "'",
      "<",
      ">",
      ".",
      "^",
      "*",
      "(",
      ")",
      "%",
      "!",
      "-",
      "]",
    ];
    let taglist = req.query.tags.toLowerCase().split(",");
    taglist = taglist.map((element) => {
      element = "<" + element + ">";
      checker.map((ele) => {
        element = element.replaceAll(ele, "\\" + ele);
      });
      return element;
    });
    console.log(taglist);
    const postlist = await Post.findAll({
      where: {
        tags: {
          [Op.regexp]: { [Op.all]: taglist },
        },
      },
      order: [[req.params.sort, req.params.order]],
      attributes: ["id"],
    });
    res.json(postlist);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const PostsByParent = async (req, res) => {
  try {
    const postlist = await Post.findAll({
      where: {
        parent_id: req.params.id,
      },
      order: [[req.params.sort, req.params.order]],
      attributes: ["id"],
    });
    res.json(postlist);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const trendingPosts = async (req, res) => {
  try {
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    let iden = await identity(req.body.user_name);
    if (iden != req.body.owner_user_id) {
      throw { message: "Different User" };
    }
    console.log(req.params.id);
    let post = await Post.update(
      { owner_user_id: -1 },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json({
      message: "Post Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const editPost = async (req, res) => {
  try {
    let iden = await identity(req.body.user_name);
    if (iden != req.body.owner_user_id) {
      throw { message: "Different User" };
    }
    let post = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const now = new Date().toISOString();
    console.log(post.parent_id);
    if (post.parent_id !== undefined) {
      await Post.update(
        { last_activity_date: now },
        {
          where: {
            id: post.parent_id,
          },
        }
      );
    }

    res.json({
      message: "Post Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
