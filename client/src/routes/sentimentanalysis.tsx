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
    <div className='flex flex-col items-center' >
      <h1 className='text-2xl font-bold'>Sentiment Analysis</h1>
      <form className='pt-8 flex flex-col items-start gap-4' onSubmit={handleSubmit}>
        <label className='text-lg font-medium flex-auto'>Enter text for sentiment analysis</label>
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text for sentiment analysis"
          rows={5}
          cols={50}
          className='flex-auto block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
        <button type="submit" className='flex-auto bg-blue-500 text-white px-4 py-2 rounded-md'>Analyze Sentiment</button>
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
