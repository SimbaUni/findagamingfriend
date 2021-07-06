const express = require("express");
const router = express.Router();
const Conversations = require('../models/conversation')
const Messages = require('../models/message')

router.get("/messages", (req, res) => {
    res.render("messages");
  });

router.post('/message', async (req, res) =>  {

 const createMessage = {
  sender: req.body.sender,
  recipient: req.body.recipient, 
  text: req.body.text,
  media: req.body.media, 
  call: req.body.call
 }
  try {
      if(!recipient || (!text.trim() && media.length === 0 && !call)) return;

      const newConversation = await Conversations.findOneAndUpdate({
          $or: [
              {recipients: [sender, recipient]},
              {recipients: [recipient, sender]}
          ]
      }, {
          recipients: [sender, recipient],
          text, media, call
      }, { new: true, upsert: true })

      const newMessage = new Messages({
          conversation: newConversation._id,
          sender, call,
          recipient, text, media
      })

      await newMessage.save()

      res.json({msg: 'Create Success!'})

  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
}),

module.exports = router;