import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('happiness');
  const [loading, setLoading] = useState(false);

  const categories = [
    'happiness',
    'age',
    'beauty',
    'anger',
    'love',
    'birthday',
    'life',
    'dad',
    'mom',
    'love',
    'knowledge',
    'inspiration',
    'wisdom',
    'jealousy',
    'humor',
    'morning',
    'friendship',
    'freedom',
    'movies',
    'success',
    'failure',
  ];

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
        headers: { 'X-Api-Key': 'EIUhT+XmXcZEFMCUarL/kQ==xpkLxeS3TYOEefp2' }
      });

      if (response.data && response.data.length > 0) {
        setQuote(response.data[0].quote);
        setAuthor(response.data[0].author);
      } else {
        setQuote('No quote found');
        setAuthor('');
      }
    } catch (error) {
      console.error('Error fetching the quote:', error);
      setQuote('Failed to fetch quote');
      setAuthor('');
    } finally {
      setLoading(false);
    }
  };

  // fetchQuote();
  // useEffect(() => {
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [category]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 animate-gradient-x text-center">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-8 max-w-xl w-full transform transition-transform hover:scale-105">
        <h1 className="text-4xl font-extrabold mb-6 text-white neon-text">
          Quote Generator
        </h1>
        <div className="mb-4">
          <label htmlFor="category" className="block text-white text-lg font-medium mb-2">
            Select Category:
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full px-4 py-2 text-gray-800 rounded-full border-none shadow-sm focus:outline-none focus:ring-4 focus:ring-pink-400"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <p className="text-2xl font-semibold mb-4 text-white neon-text">{loading ? 'Loading...' : quote}</p>
          <p className="text-white text-lg">{author && `- ${author}`}</p>
        </div>
        <button
          onClick={fetchQuote}
          className="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-pink-600 transition duration-200 hover:shadow-pink-500/50"
        >
          Get New Quote
        </button>
      </div>
    </div>
  );
};

export default QuoteGenerator;
