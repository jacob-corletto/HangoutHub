const express = require("express");
const mongoose = require("mongoose");
const Hangout = require("../models/Hangout");
const authMiddleware = require("../Middleware/authMiddleware");
const router = express.Router();

// Create a new hangout
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const newHangout = new Hangout({
      title,
      date,
      location,
      private,
      description,
      recurring,
      createdBy: req.user.userId,
      organizer: req.user.userId,
    });
    await newHangout.save();
    res.status(201).json(newHangout);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Hangouts
router.get("/", authMiddleware, async (req, res) => {
  try {
    const hangouts = await Hangout.find().populate("organizer", "username");
    res.status(200).json(hangouts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get a specific hangout by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const hangout = await Hangout.findById(req.params.id).populate(
      "organizer",
      "username"
    );
    if (!hangout) {
      return res.status(404).json({ message: "Hangout not found" });
    }
    res.status(200).json(hangout);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Join a Hangout
router.post("/:id/join", authMiddleware, async (req, res) => {
  try {
    const hangout = await Hangout.findById(req.params.id);
    if (!hangout) {
      return res.status(404).json({ message: "Hangout not found" });
    }
    if (!hangout.attendees.includes(req.user.userId)) {
      hangout.attendees.push(req.user.userId);
      await hangout.save();
    }
    res.status(200).json(hangout);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Leave a Hangout
router.post("/:id/leave", authMiddleware, async (req, res) => {
  try {
    const hangout = await Hangout.findById(req.params.id);
    if (!hangout) {
      return res.status(404).json({ message: "Hangout not found" });
    }
    hangout.attendees = hangout.attendees.filter(
      (attendee) => attendee.toString() !== req.user.userId
    );
    await hangout.save();
    res.status(200).json(hangout);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// update Hangout
router.post("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const hangout = await Hangout.findByIdAndUpdate(
      req.params.id,
      { title, description, date, location },
      { new: true }
    );
    if (!hangout) {
      return res.status(404).json({ message: "Hangout not found" });
    }
    res.status(200).json(hangout);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add a suggestion
router.post("/:id/suggestions", authMiddleware, async (req, res) => {
  try {
    const hangout = await Hangout.findById(req.params.id);
    if (!hangout) {
      return res.status(404).json({ message: "Hangout not found" });
    }
    if (!hangout.openForSuggestions) {
      return res
        .status(400)
        .json({ message: "Hangout is not open for suggestions" });
    }
    const { content, time, place } = req.body;
    const newSuggestion = {
      content,
      time,
      place,
      createdBy: req.user.userId,
    };
    hangout.suggestions.push(newSuggestion);
    await hangout.save();
    res.status(201).json(hangout);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Upvote a suggestion
router.post(
  "/:id/suggestions/:suggestionId/upvote",
  authMiddleware,
  async (req, res) => {
    try {
      const hangout = await Hangout.findById(req.params.id);
      if (!hangout) {
        return res.status(404).json({ message: "Hangout not found" });
      }
      const suggestion = hangout.suggestions.id(req.params.suggestionId);
      if (!suggestion) {
        return res.status(404).json({ message: "Suggestion not found" });
      }
      suggestion.votes += 1;
      await hangout.save();
      res.status(200).json(hangout);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Downvote a suggestion
router.post(
  "/:id/suggestions/:suggestionId/downvote",
  authMiddleware,
  async (req, res) => {
    try {
      const hangout = await Hangout.findById(req.params.id);
      if (!hangout) {
        return res.status(404).json({ message: "Hangout not found" });
      }
      const suggestion = hangout.suggestions.id(req.params.suggestionId);
      if (!suggestion) {
        return res.status(404).json({ message: "Suggestion not found" });
      }
      suggestion.votes -= 1;
      await hangout.save();
      res.status(200).json(hangout);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Select top-rated suggestion
router.post("/:id/suggestions/select-top", authMiddleware, async (req, res) => {
  try {
    const hangout = await Hangout.findById(req.params.id);
    if (!hangout) {
      return res.status(404).json({ message: "Hangout not found" });
    }
    if (hangout.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: "User not authorized" });
    }
    const topSuggestion = hangout.suggestions.sort(
      (a, b) => b.votes - a.votes
    )[0];
    if (!topSuggestion) {
      return res.status(404).json({ message: "No suggestions found" });
    }
    hangout.selectedSuggestion = {
      time: topSuggestion.time,
      place: topSuggestion.place,
    };
    hangout.date = topSuggestion.time;
    hangout.location = topSuggestion.place;
    await hangout.save();
    res.status(200).json(hangout);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
