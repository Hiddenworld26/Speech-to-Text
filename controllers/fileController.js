const axios = require('axios');

const File = require('../models/File');

const multer = require('multer');
const { Readable } = require('stream');
const webkitSpeechRecognition = require('webkit-speech-recognition');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Define your destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadFile = (req, res) => {
  // Use the 'single' middleware to handle the file upload
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: 'File upload failed' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const { originalname } = req.file;

    const file = new File({
        fileName: originalname,
        dateUploaded: new Date(),
        lastUpdated: new Date(),
        duration: 0, // Calculate duration using other libraries if needed
      });
  
      file.save((err, savedFile) => {
        if (err) {
          return res.status(500).json({ error: 'Could not save the file information' });
        }
  
        res.json(savedFile);
      });
    });
  };

const transcribeFile = (req, res) => {
  // Assuming the audio data is sent in the request body
  const audioData = req.body.audioData;

  // Use the Web Speech API for speech recognition
  const recognition = new webkitSpeechRecognition(); // For Chrome, use SpeechRecognition for other browsers
  const language = req.body.language;
recognition.lang = language;
// Set the language as needed

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;

    // Update the corresponding File document with the transcription text
    File.findByIdAndUpdate(
      req.body.fileId,
      { transcription: text },
      { new: true },
      (err, updatedFile) => {
        if (err) {
          return res.status(500).json({ error: 'Could not update the file information' });
        }

        res.json(updatedFile);
      }
    );
  };

  recognition.start();
};


const transcribeFromLink = async (req, res) => {
    const { url } = req.body;
  
    if (!url) {
      return res.status(400).json({ error: 'URL is required.' });
    }
  
    try {
      // Fetch audio or video from the provided URL
      const response = await axios.get(url, { responseType: 'stream' });
  
      if (response.status !== 200) {
        return res.status(500).json({ error: 'Failed to fetch content from the URL.' });
      }
  
      // Convert the response stream to a buffer
      let dataBuffer = Buffer.from([]);
      response.data.on('data', (chunk) => {
        dataBuffer = Buffer.concat([dataBuffer, chunk]);
      });
  
      response.data.on('end', async () => {
        // Perform transcription on the fetched content
        const recognition = new webkitSpeechRecognition(); // Initialize your speech recognition library
        // recognition.lang = 'en-US'; // Set the language or use a variable
        language = req.body.language;
        recognition.lang = language;
        
        const audioStream = new Readable();
        audioStream._read = () => {}; // Implement the _read method
  
        audioStream.push(dataBuffer);
        audioStream.push(null);
  
        recognition.onresult = (event) => {
          const text = event.results[0][0].transcript;
          // You can save, display, or send the transcription as needed
          res.json({ transcription: text });
        };
  
        audioStream.pipe(recognition);
  
        recognition.start();
      });
    } catch (error) {
      console.error('Transcription error:', error);
      res.status(500).json({ error: 'Transcription failed.' });
    }
  };
  
  
  
  
  
  
  
  

module.exports = { uploadFile, transcribeFile , transcribeFromLink};
