const express = require("express");
const route = express.Router();
const Comment = require("../models/comment");
const Listing = require("../models/listing");
const checkCommentOwner = require("../utils/checkCommentsOwner");
const isLoggedIn = require("../utils/isLoggedIn");

route.get("/listings/:id/comments/new", (req, res) => {
  res.render("comments_new", { id: req.params.id });
});

route.post(`/listings/:id/comments`, isLoggedIn, async (req, res) => {
  const comment = {
    user: {
      id: req.user._id,
      username: req.user.username,
    },
    text: req.body.text,
    postId: req.body.postId,
  };
  const newComment = await Comment.create(comment);
  req.flash("success", "Your Comment has been posted");
  try {
    res.redirect(`/listings/${req.body.postId}`);
  } catch (error) {
    console.log(error);
    res.redirect(`/listings/${req.body.postId}`);
  }
});

route.get(
  "/listings/:id/comments/:commentId/edit",
  isLoggedIn,

  async (req, res) => {
    try {
      const listing = await Listing.findById(req.params.id).exec();
      const comment = await Comment.findById(req.params.commentId).exec();
      res.render("comments_edit", { listing, comment });
    } catch (error) {
      console.log(error);
    }
  }
);

route.put(
  "/listings/:id/comments/:commentid",

  async (req, res) => {
    try {
      await Comment.findByIdAndUpdate(
        req.params.commentid,
        { text: req.body.text },
        { new: true }
      );
      req.flash("success", "Updated Comment Successfully");
      res.redirect(`/listings/${req.params.id}`);
    } catch (error) {
      console.log(error);
    }
  }
);
route.delete(
  "/listings/:id/comments/:commentId",

  async (req, res) => {
    try {
      const deletedComment = await Comment.findByIdAndDelete(
        req.params.commentId
      ).exec();
      req.flash("success", "Deleted comment successfully");
      res.redirect(`/listings/${req.params.id}`);
    } catch (error) {
      res.send(error);
    }
  }
);

module.exports = route;
