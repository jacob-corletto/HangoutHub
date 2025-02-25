const mongoose = require("mongoose");

const hangoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  private: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  interested: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  recurring: {
    isRecurring: { type: Boolean, default: false },
    frequency: { type: String }, //ex: weekly, monthly
  },
});

const Hangout = mongoose.model("Hangout", hangoutSchema);

module.exports = Hangout;
