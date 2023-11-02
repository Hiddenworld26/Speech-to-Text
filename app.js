const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const fileController = require('./controllers/fileController');

const app = express();
const port = 8000;

// Configure CORS to allow requests from your frontend domain
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend's domain
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json())

mongoose.connect('mongodb+srv://admin:admin12345@shruticluster.cumldqu.mongodb.net/audiofiles?retryWrites=true&w=majority&appName=AtlasApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define storage and upload settings for Multer

// Define routes for file upload and transcription
app.post('/upload', upload.single('audio'), fileController.uploadFile);
app.post('/transcribe', fileController.transcribeFile);
app.post('/transcribeFromLink', fileController.transcribeFromLink);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
