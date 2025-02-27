const express = require("express");
const Notification = require("../models/Notification");

const router = express.Router();

// Get Notifications for a User
router.get("/:userId", async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.params.userId }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: "Error fetching notifications" });
    }
});

module.exports = router;
