const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const stonerouter = require('./router/stone.r');
const connectDB = require('./config/DB');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer Setup (for File Uploads)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Connect to Database
connectDB();

// Routes
app.use("/stone", stonerouter);

// File Upload Route
app.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// Start Server
app.listen(9000, () => {
    console.log('Server is running on http://localhost:9000');
});
