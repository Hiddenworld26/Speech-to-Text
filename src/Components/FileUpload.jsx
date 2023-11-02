import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function FileUpload() {
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'audio/*,video/*', // Allow audio and video files
  });

  return (
    <div className="file-upload">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {file ? (
          <div className="file-preview">
            <video controls={file.type.startsWith('video')} width="100%" height="auto">
              <source src={URL.createObjectURL(file)} type={file.type} />
              Your browser does not support the video tag.
            </video>
            <audio controls={file.type.startsWith('audio')}>
              <source src={URL.createObjectURL(file)} type={file.type} />
              Your browser does not support the audio tag.
            </audio>
          </div>
        ) : (
          <p>Drag & drop an audio/video file here, or click to select a file</p>
        )}
      </div>
    </div>
  );
}

export default FileUpload;

