const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    
    if (!token) {
        return res.status(401).json({ message: "Access Denied. No Token Provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded; // Store user data in request object
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or Expired Token." });
    }
};

const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access Denied. Insufficient Permissions." });
        }
        next();
    };
};

module.exports = { authMiddleware, roleMiddleware };
