const mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
  user: {
            id: {
              type: mongoose.SchemaTypes.ObjectId,
              ref: "User",
            },
    username: String,
  },
  text: String,
  postId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Post",
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
