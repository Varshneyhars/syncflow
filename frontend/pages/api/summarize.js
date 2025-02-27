import { generateMeetingSummary } from "../../services/gemini";

export default async function handler(req, res) {
    const summary = await generateMeetingSummary(req.body.transcript);
    res.status(200).json({ summary });
}
