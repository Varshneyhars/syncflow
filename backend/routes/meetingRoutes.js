const express = require("express");
const Meeting = require("../models/Meeting");

const router = express.Router();

// Schedule a Meeting
router.post("/", async (req, res) => {
    try {
        const meeting = new Meeting(req.body);
        await meeting.save();
        res.status(201).json(meeting);
    } catch (error) {
        res.status(500).json({ error: "Error scheduling meeting" });
    }
});

// Get All Meetings
router.get("/", async (req, res) => {
    try {
        const meetings = await Meeting.find().populate("participants", "name email");
        res.json(meetings);
    } catch (error) {
        res.status(500).json({ error: "Error fetching meetings" });
    }
});

module.exports = router;

