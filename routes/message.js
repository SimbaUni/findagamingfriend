const express = require("express");
const router = express.Router();
const Conversations = require('../models/conversation')
const Messages = require('../models/message');
const Profiles = require('../models/user')

router.get("/profile/:id/message", async (req, res) => {
  try {
    const profile = await Profiles.findById(req.params.id).exec();
    res.render("message", { profile });
  } catch (error) {
    console.log(error);
  }
});

router.get("/profile/:id/inbox", async (req, res) => {
    try {
      const conversation = await Conversations.find().exec();
      
      const profile = await Profiles.find().exec();
      res.render("inbox", { conversation, profile });
    } catch (error) {
      console.log(error);
    }
});

router.get("/inbox/conversation/:id", async (req, res) => {
  try {
    
    
    const message = await Messages.find({ conversation: req.params.id }).exec();
    
    const conversation = await Conversations.findById(req.params.id).exec();
    const profile = await Profiles.find().exec();

    res.render("conversations", { message, conversation, profile });
  } catch (error) {
    console.log(error);
  }
});

router.post("/profile/message" , async (req, res) => {

  try {
      const { text, recipient, sender } = req.body
      

      if(!recipient || (!text.trim())) return;

      const newConversation = await Conversations.findOneAndUpdate({
          $or: [
              {recipients: [sender, recipient]},
              {recipients: [recipient, sender]}
          ]
      }, {
          recipients: [sender, recipient],
          text
      }, { new: true, upsert: true })

      const newMessage = new Messages({
          conversation: newConversation._id,
          sender,
          recipient, text
      })

      await newMessage.save()
      console.log("IT WORKS")

      
      res.redirect("/listings")

  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
});

router.post("/inbox/conversation" , async (req, res) => {

  try {
      const { text, media, sender, recipient } = req.body
     
      

      if(!recipient || (!text.trim() && media.length === 0)) return;

      const newConversation = await Conversations.findOneAndUpdate({
          $or: [
              {recipients: [sender, recipient]},
              {recipients: [recipient, sender]}
          ]
      }, {
          recipients: [sender, recipient],
          text, media
      }, { new: true, upsert: true })

      const newMessage = new Messages({
          conversation: newConversation._id,
          sender,
          recipient, text, media
      })

      await newMessage.save()
      console.log("IT WORKS")

      
      res.redirect("/listings")

  } catch (err) {
    
      return res.status(500).json({msg: err.message})
  }
});

module.exports = router;