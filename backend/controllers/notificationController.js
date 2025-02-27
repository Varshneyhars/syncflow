const Notification = require("../models/Notification");

// Get Notifications for a User
exports.getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.params.userId }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: "Error fetching notifications" });
    }
};
