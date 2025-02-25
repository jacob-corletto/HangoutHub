const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }], // Events associated with the group
  groupPicture: { type: String }, //URL to group picture.
  private: { type: Boolean, default: false }, //if the group is private or public.
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
