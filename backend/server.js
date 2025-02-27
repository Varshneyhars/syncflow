const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const errorMiddleware = require("./middlewares/errorMiddleware");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

// Ensure "uploads/" directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname.replace(/[^\w.-]/g, "_")}`;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    console.log("📂 Received file:", file.originalname, "Type:", file.mimetype);
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed."), false);
    }
};

const upload = multer({ 
    storage, 
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadDir));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
.catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1);
});

// Chat Schema
const chatSchema = new mongoose.Schema({
    sender: String,
    message: String,
    fileUrl: String,
    timestamp: { type: Date, default: Date.now }
});
const ChatMessage = mongoose.model("ChatMessage", chatSchema);

// File Upload Endpoint
app.post("/api/files/upload", (req, res) => {
    upload.single("file")(req, res, (err) => {
        if (err) {
            console.error("❌ Multer Error:", err.message);
            return res.status(400).json({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        res.status(201).json({
            message: "✅ File uploaded successfully",
            file: {
                filename: req.file.originalname,
                fileUrl: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
            }
        });
    });
});

// Chat Routes
app.get("/api/chat/history", async (req, res) => {
    try {
        const messages = await ChatMessage.find().sort({ timestamp: 1 });
        res.json(messages);
    } catch (err) {
        console.error("❌ Error fetching chat history:", err);
        res.status(500).json({ error: "Failed to fetch chat history" });
    }
});

app.post("/api/chat/send", async (req, res) => {
    try {
        const { sender, message, fileUrl } = req.body;

        if (!sender || (!message && !fileUrl)) {
            return res.status(400).json({ error: "Sender and message or fileUrl are required" });
        }

        const chatMessage = new ChatMessage({ sender, message, fileUrl });
        await chatMessage.save();

        io.emit("newMessage", chatMessage); // Broadcast message to all clients
        res.status(201).json(chatMessage);
    } catch (err) {
        console.error("❌ Error sending message:", err);
        res.status(500).json({ error: "Failed to send message" });
    }
});

// WebSocket Connection
io.on("connection", (socket) => {
    console.log("🔗 New client connected:", socket.id);

    socket.on("sendMessage", async (data) => {
        try {
            const { sender, message, fileUrl } = data;

            if (!sender || (!message && !fileUrl)) {
                return socket.emit("errorMessage", "Sender and message or fileUrl are required");
            }

            const chatMessage = new ChatMessage({ sender, message, fileUrl });
            await chatMessage.save();

            io.emit("newMessage", chatMessage);
        } catch (err) {
            console.error("❌ Error handling sendMessage:", err);
            socket.emit("errorMessage", "Failed to send message");
        }
    });

    socket.on("disconnect", () => {
        console.log("❌ Client disconnected:", socket.id);
    });
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/meetings", require("./routes/meetingRoutes"));
app.use("/api/files", require("./routes/fileRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

// Global Error Handling Middleware
app.use(errorMiddleware);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = { server, io };
