const express = require("express");
const router = express.Router();
const passport = require("passport");
const Listing = require("../models/listing");
const isLoggedIn = require("../utils/isLoggedIn");

router.get("/", async (req, res) => {  
  try {
    const listings = await Listing.find().exec();
    res.render("games", { listings });
  } catch (error) {
    console.log(error);
  }
});
  
router.get("/leagueoflegends", isLoggedIn, async (req, res) => {  
  try {
    const listings = await Listing.find({ gameSelected: 'League of Legends' }).exec();
    res.render("gamesListings", { listings });
  } catch (error) {
    console.log(error);
  }
});
  
router.get("/destiny2", isLoggedIn, async (req, res) => { 
  try {
    const listings = await Listing.find({ gameSelected: 'Destiny 2' }).exec();
    res.render("gamesListings", { listings });
  } catch (error) {
    console.log(error);
  }
});

router.get("/pokemongo", isLoggedIn, async (req, res) => { 
  try {
    const listings = await Listing.find({ gameSelected: 'Pokemon go' }).exec();
    res.render("gamesListings", { listings });
  } catch (error) {
    console.log(error);
  }
});

router.get("/worldofwarcraft", isLoggedIn, async (req, res) => { 
  try {
    const listings = await Listing.find({ gameSelected: 'World of Warcraft' }).exec();
    res.render("gamesListings", { listings });
  } catch (error) {
    console.log(error);
  }
});

router.get("/dota2", isLoggedIn, async (req, res) => { 
  try {
    const listings = await Listing.find({ gameSelected: 'Dota 2' }).exec();
    res.render("gamesListings", { listings });
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;