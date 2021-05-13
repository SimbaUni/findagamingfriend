const express = require("express");
const { Mongoose } = require("mongoose");
const router = express.Router();
const Listing = require("../models/listing");
const Comment = require("../models/comment");
const checkListingOwner = require("../utils/checkListingOwner");
const isLoggedIn = require("../utils/isLoggedIn");
const { rawListeners } = require("../models/listing");

router.get("/", async (req, res) => {
 
  try {
    const listings = await Listing.find().exec();
    res.render("listings", { listings });
  } catch (error) {
    console.log(error);
  }
});
router.post("/", async (req, res) => {
  //make schema
  const newListing = {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    lookingFor: req.body.lookingFor,
    genre: req.body.genre,
    gameSelected: req.body.gameSelected,
    platform: req.body.platform,
    region: req.body.region,
    timezone: req.body.timezone,
    owner: {
      id: req.user._id,
      username: req.user.username,
    },
  };

  const listing = await Listing.create(newListing);
  req.flash("success", "You have successfully created a new Listing");
  try {
    res.redirect("/listings/" + listing._id);
  } catch (error) {
    console.log(error);
  }
});
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings_new");
});
router.get("/search", async (req, res) => {
  try {
    const listings = await Listing.find({
      $text: {
        $search: req.query.term,
      },
    });
    req.flash("success", "Here are the results");
    res.render("listings", { listings });
  } catch (error) {
    console.log(error);
  }
});
//Genre
router.get("/genre/:genre", async (req, res) => {
  const validGenres = [
    "Fighting",
    "Shooter",
    "Racing",
    "Platform",
    "Real Time Strategy (RTS)",
    "Role-playing (RPG)",
    "Simulator",
    "Sport",
    "Strategy",
    "Adventure",
    "MOBA",
    "Card & Board Game",
    "Indie"
  ];
  if (validGenres.includes(req.params.genre)) {
    const listings = await Listing.find({ genre: req.params.genre }).exec();

    res.render("listings", { listings });
  } else {
    console.log("Enter Valid Genre " + req.params.genre);
  }
});
router.get("/:id", isLoggedIn, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).exec();
    const comments = await Comment.find({ postId: req.params.id });

    res.render("listings_show", { listing, comments });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id/edit", checkListingOwner, async (req, res) => {
  const listing = await Listing.findById(req.params.id).exec();

  res.render("listings_edit", { listing });
});

router.put("/:id/", checkListingOwner, async (req, res) => {
  const listing = {
    title: req.body.title,
    description: req.body.description,
    datePosted: req.body.datePosted,
    lookingFor: req.body.lookingFor,
    genre: req.body.genre,
    gameSelected: req.body.gameSelected,
    platform: req.body.platform,
    region: req.body.region,
    timezone: req.body.timezone,
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, listing, {
      new: true
    }).exec();
    req.flash("success", "You have successfully Updated Your Listing");
    res.redirect("/listings/" + req.params.id);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/:id/", checkListingOwner, async (req, res) => {
  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id).exec();
    req.flash("success", "You have successfully Deleted Your Listing");
    res.redirect("/listings");
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
