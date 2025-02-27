const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate AI Task Summary
router.post("/summary", async (req, res) => {
    try {
        const { taskDescription } = req.body;

        if (!taskDescription) {
            return res.status(400).json({ error: "Task description is required" });
        }

        // ✅ Correct API call using Gemini model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });

        const result = await model.generateContent(taskDescription);
        const response = await result.response;
        const summary = response.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated.";

        res.json({ summary });
    } catch (error) {
        console.error("AI API Error:", error);
        res.status(500).json({ error: "Error generating AI summary", details: error.message });
    }
});

module.exports = router;
