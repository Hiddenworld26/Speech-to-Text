// routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // This is where Multer is configured

const fileController = require('../controllers/fileController');

router.post('/upload', upload.single('audio'), fileController.uploadFile);
router.post('/transcribe', fileController.transcribeFile);
router.post('/transcribeFromLink', fileController.transcribeFromLink);

module.exports = router;
