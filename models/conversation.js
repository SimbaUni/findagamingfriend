const mongoose = require('mongoose');
const conversationSchema = new mongoose.Schema({
    recipients: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    text: String,
}, {
    timestamps: true
});

module.exports = mongoose.model("Conversation", conversationSchema);