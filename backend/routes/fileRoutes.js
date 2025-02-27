const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Ensure "uploads/" directory exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Upload a File
router.post("/upload", upload.single("file"), (req, res) => {
    console.log("Received Upload Request");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    // Prepare the response object
    const fileDetails = {
        filename: req.file.originalname,
        fileUrl: `/uploads/${req.file.filename}`,
        uploadedBy: req.body.userId || "Unknown",
    };

    // Return the file details in the response
    res.status(201).json({ message: "File uploaded successfully", file: fileDetails });
});

module.exports = router;