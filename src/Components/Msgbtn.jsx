import React, { useState } from 'react';
import './myStyles.css';
import Model from 'react-modal';
import axios from 'axios';

Model.setAppElement('#root'); // Set the root element for the modal

function Msgbtn() {
  const [file, setFile] = useState(null);
  const [selects, setSelects] = useState('Default');
  const [fileId, setFileId] = useState(null);
  const [visible, setVisible] = useState(false);

  const [url, setUrl] = useState('');

const handleTranscribeLink = async () => {
  if (!url) {
    alert('Please enter a valid URL.');
    return;
  }

  try {
    const response = await axios.post('http://localhost:8000/transcribeFromLink', { url });

    if (response.data.transcription) {
      alert('Transcription completed.');
      // Handle success, e.g., show the transcription result.
    } else {
      alert('Transcription failed.');
    }
  } catch (error) {
    console.error('Transcription error:', error);
    alert('Transcription failed.');
  }
};


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      alert('Please select a file to upload.');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('audio', file);
    formData.append('language', selects);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData);

      if (response.status === 200) {
        alert('File uploaded successfully.');
        setFileId(response.data._id); // Set the fileId from the response
      } else {
        alert('File upload failed.');
      }

      console.log('File uploaded:', response.data);
    } catch (error) {
      console.error('File upload error:', error);
      alert('File upload failed.');
    }
  };

  const handleTranscribe = async () => {
    if (!fileId) {
      alert('Please upload a file before transcribing.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('fileId', fileId);

      const response = await axios.post('http://localhost:8000/transcribe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.transcription) {
        alert('Transcription completed.');
        // Handle success, e.g., show the transcription result.
      } else {
        alert('Transcription failed.');
      }
    } catch (error) {
      console.error('Transcription error:', error);
    }
  };

  return (
    <div className="msg-btn">
      <div className="Welcome-Message">
        <span className="Message-1">Welcome Shruti</span>
        <span className="Message-2">Upload your audio and video to convert to text</span>
      </div>

      <div>
        <button className="message-button" onClick={() => setVisible(true)}>
          Transcribe File
        </button>

        <Model className="popover-slide" isOpen={visible} onRequestClose={() => setVisible(false)}>
          <div className="popover-heading">Transcribe File</div>
          <div className="Language-box">
            <div className="Language-box-hd">Transcription Language</div>
            <div className="lang-choice">
              <div className="lang-option-box">
                <select id="options" value={selects} onChange={(e) => setSelects(e.target.value)}>
                  <option value="Default">Default</option>
                  <option value="en-US">English</option>
                  <option  value="hi-IN">Hindi</option>
                  <option value="ja-JP">Japanese</option>
                  <option value="ko-KR">Korean</option>
                </select>
              </div>
            </div>
            <div className="drop-box">
              <div className="upload-box">
                
                <div className='cloud-icon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
  <path d="M8.40782 16.5922L12.5 12.5M12.5 12.5L16.5922 16.5922M12.5 12.5V21.7074M20.6844 17.3522C21.934 16.3201 22.7305 14.7588 22.7305 13.0115C22.7305 9.90398 20.2113 7.38479 17.1037 7.38479C16.8802 7.38479 16.671 7.26816 16.5575 7.07556C15.2234 4.81166 12.7603 3.2926 9.94239 3.2926C5.70479 3.2926 2.26953 6.72786 2.26953 10.9655C2.26953 13.0792 3.12424 14.9933 4.50689 16.381" stroke="#0048AD" stroke-width="2.30186" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                </div>
                <div>
                  <span className='t-1'>Click to Upload</span> <span className='t-2'>or Darg and Drop</span>
                </div>
                <input className='input-file-btn' type="file" accept=".mp3, .wav, .jpg, .ogg" onChange={(e) => handleFileChange(e)} />
                <button className='upload-btn' onClick={handleUpload}>
                  Click to Upload
                </button>
              </div>
              <div></div>

             </div>
            <div className="link-box">
  <div className="link-text">Import from Link</div>
  <div className="link-drop">
    <div className="link-drop-text">
      <input
        type="text"
        placeholder="Paste a Dropbox, Google Drive, or YouTube URL here"
        onChange={(e) => setUrl(e.target.value)}
      />
      <button className="transcribe-link-btn" onClick={handleTranscribeLink}>
        Transcribe from Link
      </button>
    </div>
  </div>
</div>

            <div className="user-identification">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <rect x="1.25" y="0.75" width="18.5" height="18.5" rx="3.25" fill="white" stroke="#D0D5DD" stroke-width="1.5" />
                </svg>
              </span>
              <span className="iden-text">Speaker identification</span>
            </div>
            <div className="tbb">
              <button className="transcribe-btn"  onClick={handleUpload} onClick={handleTranscribe}>
                Transcribe File
              </button>
            </div>
          </div>
          <button onClick={() => setVisible(false)}>Close</button>
        </Model>
      </div>
    </div>
  );
}

export default Msgbtn;
