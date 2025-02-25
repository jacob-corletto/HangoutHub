const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  hangoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hangout",
    required: true,
  },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  media: { type: String }, //URL to media file
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
