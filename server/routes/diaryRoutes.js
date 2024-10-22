const express = require('express');
const router = express.Router();
const DiaryEntry = require('../models/DiaryEntry');

// POST request to handle form submission (create a new diary entry)
router.post('/', async (req, res) => {
  const { date, name, description } = req.body;
  try {
    const newEntry = new DiaryEntry({
      date,
      name,
      description,
    });
    await newEntry.save();
    res.status(201).json({ message: 'Diary entry saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving the diary entry' });
  }
});

// GET request to fetch diary entries by name
// GET request to fetch diary entries by name
router.get('/search', async (req, res) => {
    const { name } = req.query; // Use req.query to get the name from the query string
    console.log("Searching for entries with name:", name); // Log the name being searched
  
    try {
      const entries = await DiaryEntry.find({ name });
      console.log("Entries found:", entries); // Log the entries found
      if (entries.length === 0) {
        return res.status(404).json({ message: 'No entries found for this name' });
      }
      res.status(200).json(entries);
    } catch (error) {
      console.error("Error fetching diary entries:", error); // Log the error
      res.status(500).json({ error: 'Error fetching diary entries' });
    }
  });

module.exports = router;
