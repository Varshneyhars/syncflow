const File = require("../models/File");

// Upload a File
exports.uploadFile = async (req, res) => {
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
};
