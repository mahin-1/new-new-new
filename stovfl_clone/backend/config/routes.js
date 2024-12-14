import express from "express";
import * as authC from "../controllers/authController.js";
import * as userC from "../controllers/usersController.js";
import * as postC from "../controllers/postsController.js";
import * as commentC from "../controllers/commentsController.js";
import * as tagC from "../controllers/tagsController.js";
import * as voteC from "../controllers/votesController.js";

const router = express.Router();

router.get("/auth", authC.authUser); // Works
router.post("/user", authC.createUser); // Works
router.get("/user/:user_name", userC.getUserByName); // Works
router.get("/usersearch", userC.getFuzzyUser); // Works

router.get("/post/:id", postC.getPostById); // Works
router.get("/post/user/:id/:post_type/:sort/:order/", postC.PostsByUser); // Works
router.get("/post/parent/:id/:sort/:order", postC.PostsByParent); // Works
router.get("/post/tag/:sort/:order", postC.PostsByTags); // Works

router.get("/comment/:id", commentC.getCommentById); // Works
router.get("/comment/user/:id/:sort/:order", commentC.CommentsByUser); // Works
router.get("/comment/parent/:id/:sort/:order", commentC.CommentsByParent); // Works

router.get("/tag/trend", tagC.getTrending);
router.get("/tagsearch", tagC.getFuzzyTag); // Works

router.get("/checkToken/:token", authC.checkToken2); // Works
router.get("/vote/:userid/:postid", voteC.getVote);

router.use("/", authC.checkToken); // Works
router.patch("/user/:id", userC.updateUser); // Works
router.delete("/user/:id", userC.deleteUser);
router.post("/post", postC.createPost); // Works
router.patch("/post/:id", postC.editPost); // Works
router.delete("/post/:id", postC.deletePost);
router.post("/comment", commentC.createComment); // Works
router.patch("/comment/:id", commentC.editComment); // Works
router.delete("/comment/:id", commentC.deleteComment);
router.post("/vote", voteC.setVote);
router.delete("/vote/:userid/:postid", voteC.resetVote);
router.patch("/pass/:id", authC.updatePass);

export default router;
