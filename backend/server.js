// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully');
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.use("/api/tasks", require("./routes/task"));

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(5000, () => console.log("Server running on port 5000"));

module.exports = { server, io };