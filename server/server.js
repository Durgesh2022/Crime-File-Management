const express = require("express");
const connectDB = require("./config/db");
const diaryRoutes = require("./routes/diaryRoutes");
const cors = require("cors");
const bodyParser = require("body-parser"); // Import body-parser
require("dotenv").config();
const UserRouter = require("./routes/UserRouter");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Use body-parser for JSON parsing
app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser for URL-encoded data

// Routes
app.use("/api/diary", diaryRoutes);
app.use("/api/user", UserRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("hello world");
});
