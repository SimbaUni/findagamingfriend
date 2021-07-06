const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    category: String,
    message: String,
    owner: {
      id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
      username: String,
    }}, {
    timestamps: true
    });

module.exports = mongoose.model("Contact", contactSchema);