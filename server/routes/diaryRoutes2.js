const express = require('express');
const { createDiaryEntry } = require('../controllers/diaryController');
const upload = require('../middleware/multer');

const router = express.Router();

// POST route to submit the new form (DiaryForm2)
router.post('/diary2', upload.single('document'), createDiaryEntry);

module.exports = router;
