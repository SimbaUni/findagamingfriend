const Profile = require("../models/user");

const checkProfileOwner = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const profile = await Profile.findById(req.params.id).exec();

    if (profile._id.equals(req.user._id)) {
      next();
    } else {
      res.redirect("back");
    }
  } else {
    res.redirect("/login");
  }
};

module.exports = checkProfileOwner;