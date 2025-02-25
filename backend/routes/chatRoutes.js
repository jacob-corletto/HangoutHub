const express = require("express");
const mongoose = require("mongoose");
const Chat = require("../models/Chat");
const authMiddleware = require("../Middleware/authMiddleware");
const router = express.Router();

// Create a new chat message
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { hangoutId, content, media } = req.body;
    const newChat = new Chat({
      hangoutId,
      sender: req.user.userId,
      content,
      media,
    });
    await newChat.save();
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all chat messages for a specific hangout
router.get("/:hangoutId", authMiddleware, async (req, res) => {
  try {
    const chats = await Chat.find({ hangoutId: req.params.hangoutId }).populate(
      "sender",
      "username"
    );
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Chat Message
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return res.status(404).json({ message: "Chat message not found" });
    }
    if (chat.sender.toString() !== req.user.userId) {
      return res.status(403).json({ message: "User not authorized" });
    }
    await chat.remove();
    res.status(200).json({ message: "Chat message deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
