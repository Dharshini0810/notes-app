const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please enter the title."],
    },
    date: {
      type: Date,
      default: new Date().getTime(),
    },
    content: {
      type: String,
      required: [true, "Please enter the content"],
    },
    tags: {
      type: [String],
      default: [],
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note",noteSchema)
