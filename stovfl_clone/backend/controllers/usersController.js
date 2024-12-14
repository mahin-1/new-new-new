import { User } from "../models/usersModel.js";
import { Auth } from "../models/authModel.js";
import { Op } from "sequelize";

export const identity = async (user_name) => {
  let arr = user_name.split("@");
  let iden = "";
  if (arr.length == 2) iden = arr[arr.length - 1];
  else if (arr.length == 1) iden = arr[0];
  return iden;
};

export const updateUser = async (req, res) => {
  try {
    let iden = await identity(req.body.user_name);
    if (iden != req.params.id) {
      throw { message: "Different User" };
    }
    await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "User Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getUserByName = async (req, res) => {
  try {
    let arr = req.params.user_name.split("@");
    let iden = "";
    if (arr.length == 2) iden = arr[arr.length - 1];
    else if (arr.length == 1) iden = arr[0];
    const user = await User.findAll({
      where: {
        id: iden,
      },
    });
    res.json(user[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getFuzzyUser = async (req, res) => {
  try {
    // let checker = ['[', '$', '&', '+', ':', ';', '=', '?', '@', '#', '|', '\'', '<', '>', '.', '^', '*', '(', ')', '%', '!', '-', ']'];
    let id = req.query.id.toString().toLowerCase() + "%";

    // checker.map(ele => {
    //     id = id.replaceAll(ele, "\\" + ele)
    // });
    const userlist = await Auth.findAll({
      where: {
        user_name: {
          [Op.iLike]: id,
        },
      },
      limit: 15,
      attributes: ["user_name"],
    });
    res.json(userlist);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    let iden = await identity(req.body.user_name);
    if (iden != req.params.id) {
      throw { message: "Different User" };
    }
    await Post.update(
      { onwer_user_id: -1 },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    await Comment.update(
      { user_id: -1 },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    await Auth.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "User Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
