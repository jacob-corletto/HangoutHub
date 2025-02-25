const express = require("express");
const User = require("../models/User");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Get user profile
router.get("/profile/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update User Profile
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { username, email, profilePicture } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { username, email, profilePicture },
      { new: true, runValidators: true }
    ).select("-password");
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get User's Hangouts
router.get("/hangouts", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate(
        "hangoutHistory createdHangouts interestedHangouts attendingHangouts"
      )
      .select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      hangoutHistory: user.hangoutHistory,
      createdHangouts: user.createdHangouts,
      interestedHangouts: user.interestedHangouts,
      attendingHangouts: user.attendingHangouts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get User's Notifications
router.get("/notifications", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("notifications");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.notifications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
