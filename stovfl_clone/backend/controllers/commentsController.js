import { Comment } from "../models/commentsModel.js";
import { Post } from "../models/postsModel.js";
import { Op } from "sequelize";

export const identity = async (user_name) => {
  let arr = user_name.split("@");
  let iden = "";
  if (arr.length == 2) iden = arr[arr.length - 1];
  else if (arr.length == 1) iden = arr[0];
  return iden;
};

async function postupdate(comment) {
  const now = new Date().toISOString();
  let post = await Post.update(
    { last_activity_date: now },
    {
      where: {
        id: comment.post_id,
      },
    }
  );

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
}

export const createComment = async (req, res) => {
  try {
    if (req.body.body === "" && req.body.title === "") {
      throw { message: "Comment cannot be empty" };
    }
    let iden = await identity(req.body.user_name);
    if (iden != req.body.user_id) {
      throw { message: "Different User" };
    }

    let max_val = await Comment.max("id");
    req.body.id = 1 + max_val;
    const now = (new Date()).toISOString();
    // const threshold = now - 30 * 60 * 1000;

    // const spamcount = await Comment.count({
    //   where: {
    //     user_id: req.body.user_id,
    //     creation_date: { [Sequelize.Op.gte]: threshold },
    //   },
    // });

    // if (spamcount > 30) {
    //   res.json({ message: "Spam" });
    //   return;
    // }
    req.body.creation_date = now;
    let comment = await Comment.create(req.body);

    await postupdate(comment);

    res.json({
      message: "Comment created",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(comment[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const CommentsByUser = async (req, res) => {
  try {
    const commentlist = await Comment.findAll({
      where: {
        user_id: req.params.id,
      },
      order: [[req.params.sort, req.params.order]],
      attributes: ["id"],
    });
    res.json(commentlist);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const CommentsByParent = async (req, res) => {
  try {
    const commentlist = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
      order: [[req.params.sort, req.params.order]],
      attributes: ["id"],
    });
    res.json(commentlist);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    let iden = await identity(req.body.user_name);
    if (iden != req.body.user_id) {
      throw { message: "Different User" };
    }
    await Comment.update(
      { user_id: -1 },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json({
      message: "Comment Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const editComment = async (req, res) => {
  try {
    let iden = await identity(req.body.user_name);
    if (iden != req.body.user_id) {
      throw { message: "Different User" };
    }
    let comment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    await postupdate(comment);

    res.json({
      message: "Comment Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
