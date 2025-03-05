const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
  des: { type: String, required: true }
});

module.exports = mongoose.model("Item", itemSchema);
