const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const Listing = require("../models/listing");
const isLoggedIn = require("../utils/isLoggedIn");
const Contact = require("../models/contact");

router.get("/", (req, res) => {
  res.render("landing");
});

//signup New
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  try {
    const newUser = await User.register(
      new User({
        email: req.body.email,
        username: req.body.username,
      }),
      req.body.password
    );

    req.flash(`success`, `Signed you up as ${newUser.username}`);

    passport.authenticate("local")(req, res, () => {
      res.redirect("/listings");
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/listings",

    failureRedirect: "/login",
    failureFlash: true,
    successFlash: "Logged in Successfully",
  })
);

router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success", "Logged out Successfully");
  res.redirect("/login");
});

router.get("/contact", isLoggedIn, (req, res) => {
    res.render("contact");
});

router.get("/contactAdmin", isLoggedIn, async (req, res) => {
  try {
    const contact = await Contact.find().exec();
    res.render("admin", { contact });
  } catch (error) {
    console.log(error);
  }
});

router.post("/contact", isLoggedIn, async (req, res) => {
  
    const contactMessages = {
      category: req.body.category,
      message: req.body.message,
      owner: {
        id: req.user._id,
        username: req.user.username,
      },
    };
    const contact = await Contact.create(contactMessages);
    req.flash("success", "You have successfully messaged Admin");
    try {
      res.redirect("/contact");
    } catch (error) {
      console.log(error);
    }
});

module.exports = router;
