const express = require("express");
const multer = require("multer");
const File = require("../models/File");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Upload a File
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const file = new File({
            filename: req.file.originalname,
            fileUrl: `/uploads/${req.file.filename}`,
            uploadedBy: req.body.userId
        });

        await file.save();
        res.status(201).json(file);
    } catch (error) {
        res.status(500).json({ error: "Error uploading file" });
    }
});

module.exports = router;
