const User = require("../models/User");

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
};
