const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate AI Task Summary
router.post("/summary", async (req, res) => {
    try {
        const { taskDescription } = req.body;
        const response = await genAI.generateText(taskDescription);
        res.json({ summary: response.text() });
    } catch (error) {
        res.status(500).json({ error: "Error generating AI summary" });
    }
});

module.exports = router;
