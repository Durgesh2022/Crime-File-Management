const express = require("express");
const router = express.Router();
const multer = require("multer");
const DiaryEntry = require("../models/DiaryEntry");

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Directory where images will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Rename the file with a timestamp
    },
});

const upload = multer({ storage: storage });

// POST request to handle form submission (create a new diary entry)
router.post("/", upload.single("image"), async (req, res) => {
    const { caseNo, date, name, description } = req.body;
    let image = req.file ? req.file.path : null;

    // Replace backslashes with forward slashes in the image path
    if (image) {
        image = image.replace(/\\/g, "/"); // Ensure this line is executed
    }

    try {
        const newEntry = new DiaryEntry({
            caseNo,
            date,
            name,
            description,
            image, // Use the modified image path here
        });
        await newEntry.save();
        res.status(201).json({ message: "Diary entry saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error saving the diary entry" });
    }
});

// GET request to fetch diary entries by name and case number
router.get("/search", async (req, res) => {
    const { name, caseNo } = req.query; // Destructure both name and caseNo from the query
    console.log(
        "Searching for entries with name:",
        name,
        "and caseNo:",
        caseNo
    );

    // Validate input: both name and caseNo must be provided
    if (!name || !caseNo) {
        return res
            .status(400)
            .json({ message: "Both name and case number must be provided." });
    }

    try {
        // Search for entries matching both name and caseNo
        const entries = await DiaryEntry.find({
            name: name, // Match the name exactly
            caseNo: caseNo, // Match the caseNo exactly
        });

        console.log("Entries found:", entries);

        if (entries.length === 0) {
            return res
                .status(404)
                .json({
                    message:
                        "No entries found for the provided name and case number.",
                });
        }

        res.status(200).json(entries);
    } catch (error) {
        console.error("Error fetching diary entries:", error);
        res.status(500).json({ error: "Error fetching diary entries" });
    }
});

module.exports = router;
