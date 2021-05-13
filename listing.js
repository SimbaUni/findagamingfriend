const mongoose = require("mongoose");
const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  region: String,
  timezone: String,
  date: Date,
  lookingFor: Number,
  genre: String,
  gameSelected: String,
  platform: String,
  owner: {
    id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    username: String,
  },
});
listingSchema.index({
  "$**": "text",
});

module.exports = mongoose.model("Listing", listingSchema);
