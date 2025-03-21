const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name"],
    },
    email: {
      type: String,
      required: [true, "Please enter the email"],
      unique : [ true,"Email address already registered"]
    },
    password: {
      type: String,
      required: [true, "Please enter the password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User",userSchema)
