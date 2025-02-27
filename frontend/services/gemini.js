const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://api.gemini.com/v1/chat";

async function generateMeetingSummary(transcript) {
    const response = await axios.post(GEMINI_API_URL, {
        messages: [{ role: "user", content: `Summarize this: ${transcript}` }],
    }, { headers: { Authorization: `Bearer ${GEMINI_API_KEY}` } });

    return response.data;
}

module.exports = { generateMeetingSummary };
