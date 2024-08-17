import axios from 'axios';
import React, { useState } from 'react';


const PhotoAnalysis: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<string | null>(null);
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setFile(event.target.files[0]);
      }
    };
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!file) {
        alert('Please select a file');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await axios.post('/api/photoanalysis', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setResult(JSON.stringify(response.data, null, 2));
      } catch (error) {
        console.error('Error uploading file:', error);
        setResult('Error uploading file. Please try again.');
      }
    };
  
    return (
      <div>
        <h1>Photo Analysis</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} accept="image/*" />
          <button type="submit">Upload and Analyze</button>
        </form>
        {result && (
          <div>
            <h2>Analysis Result:</h2>
            <pre>{result}</pre>
          </div>
        )}
      </div>
    );
  };
  export default PhotoAnalysis;