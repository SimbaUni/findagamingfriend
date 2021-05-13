const Listing = require("../models/listing");

const checkListingOwner = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const listing = await Listing.findById(req.params.id).exec();

    if (listing.owner.id.equals(req.user._id)) {
      next();
    } else {
      res.redirect("back");
    }
  } else {
    res.redirect("/login");
  }
};

module.exports = checkListingOwner;
