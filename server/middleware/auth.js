const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Get the token from the Authorization header

    if (!token) {
        return res
            .status(401)
            .json({
                success: false,
                message: "Access denied. No token provided.",
            });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res
                .status(403)
                .json({ success: false, message: "Invalid token." });
        }
        req.userId = user.id; // Attach the user ID to the request object
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateToken;
