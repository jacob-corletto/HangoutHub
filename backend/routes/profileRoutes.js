const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Update nickname
router.put('/:id/nickname', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { nickname: req.body.nickname }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Update profile picture
router.put('/:id/picture', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { picture: req.body.picture }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;