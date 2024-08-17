import React, { useState } from 'react';
import axios from 'axios';

const SentimentAnalysis: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!text.trim()) {
      alert('Please enter some text');
      return;
    }

    try {
      const response = await axios.post('/api/sentiment', { text });
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      setResult('Error analyzing sentiment. Please try again.');
    }
  };

  return (
    <div>
      <h1>Sentiment Analysis</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text for sentiment analysis"
          rows={5}
          cols={50}
        />
        <br />
        <button type="submit">Analyze Sentiment</button>
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

export default SentimentAnalysis;
