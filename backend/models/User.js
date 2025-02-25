const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store hashed passwords!
  profilePicture: { type: String }, // URL to profile picture
  hangoutHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hangout" }], // References to joined Hangouts
  createdHangouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hangout" }], // References to Hangouts the user created
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }], // References to groups the user is part of
  interestedHangouts: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Hangout" },
  ],
  attendingHangouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hangout" }],
  notifications: [
    {
      type: { type: String },
      content: { type: String },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
