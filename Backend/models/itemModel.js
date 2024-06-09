const mongoose = require("mongoose");

// stores items/objects to be used in Match-the-word activity
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = { Items: mongoose.model("Items", itemSchema, "Items") };
