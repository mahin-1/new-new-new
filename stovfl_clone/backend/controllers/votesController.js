import { Vote } from "../models/votesModel.js";
import { Post } from "../models/postsModel.js";

export const setVote = async (req, res) => {
  try {
    // console.log(req.body.token)

    let max_val = await Vote.max("id");
    req.body.id = 1 + max_val;
    const now = new Date().toISOString();
    req.body.creation_date = now;
    await Vote.create(req.body);
    let updatescore = 5 - req.body.vote_type_id * 2;
    await Post.increment(
      { score: updatescore },
      {
        where: {
          id: req.body.post_id,
        },
      }
    );
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getVote = async (req, res) => {
  try {
    const votelist = await Vote.findAll({
      where: { user_id: req.params.userid,post_id: req.params.postid },
    });
    res.json(votelist);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const resetVote = async (req, res) => {
  try {
    console.log(req.body.user_name)
    await Vote.destroy({
      where: {
        user_id: req.params.userid,
        post_id: req.params.postid,
      },
    });
    let updatescore = req.body.vote_type_id * 2 - 5;
    await Post.increment(
      { score: updatescore },
      {
        where: {
          id: req.params.postid,
        },
      }
    );
    res.json({
      message: "Vote Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
