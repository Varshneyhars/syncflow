const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const multer = require("multer");
const errorMiddleware = require("./middlewares/errorMiddleware");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Setup Multer for File Uploads
// const storage = multer.diskStorage({
//     destination: "uploads/",
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     },
// });
// const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File Upload Endpoint
app.post("/upload", upload.single("file"), (req, res) => {
    res.json({ message: "File uploaded successfully", file: req.file });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
.catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1); // Exit on DB connection failure
});



// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/meetings", require("./routes/meetingRoutes"));
app.use("/api/files", require("./routes/fileRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
// ✅ Serve Static Files
app.use("/uploads", express.static("uploads"));
// WebSocket Connection
io.on("connection", (socket) => {
    console.log("🔗 New client connected");

    // Handle Real-Time Task Updates
    socket.on("taskUpdated", (task) => {
        io.emit("updateTasks", task);
    });

    socket.on("disconnect", () => {
        console.log("❌ Client disconnected");
    });
});

// Global Error Handling Middleware
app.use(errorMiddleware);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = { server, io };
