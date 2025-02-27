const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
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
        const cleanFileName = file.originalname.replace(/[^\w.-]/g, "_"); // Removes special characters
        cb(null, `${Date.now()}-${cleanFileName}`);
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

// Create the upload middleware but don't apply it globally
const upload = multer({ 
    storage, 
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Middleware
app.use(cors());
// Important: These middleware need to be before any routes that handle file uploads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadDir));

// File Upload Endpoint
app.post("/api/files/upload", (req, res) => {
    // Apply the upload middleware here
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

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
.catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1);
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/meetings", require("./routes/meetingRoutes"));
app.use("/api/files", require("./routes/fileRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

// WebSocket Connection
io.on("connection", (socket) => {
    console.log("🔗 New client connected");

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