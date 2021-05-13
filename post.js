const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  datePosted: Date,
  owner: {
    id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    username: String,
  },
});
postSchema.index({
  "$**": "text",
});

module.exports = mongoose.model("Post", postSchema);