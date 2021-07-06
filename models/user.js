const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  pronouns: {
    type: String,
    required: true,
    default: 'he/him/his'
  },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
  },
  role: {
    type: String, 
    default: 'User'
  },
  bio: {
    type: String,
    default: '',
    maxlength: 200
  },
  saved: [{
    type: mongoose.Types.ObjectId, 
    ref: 'User'
  }]
}, {
  timestamps: true
});
userSchema.index({
  "$**": "text",
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
