const express = require("express");
const multer = require("multer");
const path = require("path");
const Stone = require("../model/stone.model");

const router = express.Router();
const { createItem, getItems, getItem, updateItem, deleteItem } = require("../controller/stone.c");



// Multer Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Create Item with Image Upload
router.post("/", upload.single("image"), async (req, res) => {
    const { title, des } = req.body;
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    try {
        const stone = await Stone.create({
            title,
            img: `/uploads/${req.file.filename}`,
            des
        });
        res.json(stone);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post("/", createItem);
router.get("/", getItems);
router.get("/:id", getItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);
module.exports = router;
