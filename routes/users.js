const express = require("express");
const router = express.Router();
const User = require("../models/user");
const isLoggedIn = require("../utils/isLoggedIn");
const checkProfileOwner = require("../utils/checkProfileOwner");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");


router.get("/profile", isLoggedIn, async (req, res) => {  
    try {
      res.render("profileSearch",  req.user._id );
    } catch (error) {
      console.log(error);
    }
});

router.get("/profile/:id", isLoggedIn, async (req, res) => {
  try {
    const profile = await User.findById(req.params.id).exec();

    res.render("profile", { profile });
  } catch (error) {
    console.log(error);
  }
});

router.get("/profile/:id/edit", checkProfileOwner, async (req, res) => {
  const users = await User.findById(req.params.id).exec();


  res.render("account", { users });
});

cloudinary.config({
  cloud_name: 'dkkgemejy',
  api_key: '362155133674229',
  api_secret: '20OJlfqYUQ3Xka0wurapdcOnqXw'
  });
  const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "demo",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }],
  });
  const parser = multer({ storage: storage });


router.put("/profile/:id/", parser.single("image"), async (req, res) => {

  console.log(req.file);
  
  if (req.file === undefined) {
    image = req.user.avatar
  } else {
    image = req.file.path
  }

  const user = {

    pronouns: req.body.pronouns,
    bio: req.body.bio,
    avatar: image
    
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, user, {
      new: true
    }).exec();
    req.flash("success", "You have successfully Updated Your Profile");

    res.redirect("/profile/" + req.params.id);
  } catch (error) {
    console.log(error);
  }
});

router.get("/profilesearch", async (req, res) => {
 
  try {
    const users = await User.find().exec();
    res.render("profileSearch", { users });
  } catch (error) {
    console.log(error);
  }
});

router.get("/search", async (req, res) => {
  try {
    const users = await User.find({
      $text: {
        $search: req.query.term,
      },
    });
    req.flash("success", "Here are the results");
    res.render("profileSearch", { users });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;