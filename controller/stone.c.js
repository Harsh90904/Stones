const Item = require("../model/stone.model");

exports.createItem = async (req, res) => {
  const { title, img, des } = req.body;
  const item = await Item.create({ title, img, des });
  res.json(item);
};

exports.getItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

exports.getItem = async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
};

exports.updateItem = async (req, res) => {
  const { title, img, des } = req.body;
  const item = await Item.findByIdAndUpdate(req.params.id, { title, img, des }, { new: true });
  res.json(item);
};

exports.deleteItem = async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
};
