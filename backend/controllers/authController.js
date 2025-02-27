const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// User Registration
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // 1️⃣ Check for empty fields
        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // 2️⃣ Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // 3️⃣ Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4️⃣ Create the user
        const user = new User({ name, email, password: hashedPassword, role });

        await user.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Registration Error:", error); // ✅ Log the error
        res.status(500).json({ error: "Error registering user" });
    }
};


// User Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1️⃣ Check for missing fields
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // 2️⃣ Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // 3️⃣ Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // 4️⃣ Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ 
            token, 
            user: { id: user._id, name: user.name, email: user.email, role: user.role } 
        });

    } catch (error) {
        console.error("Login Error:", error); // ✅ Log the error
        res.status(500).json({ error: "Login failed" });
    }
};

