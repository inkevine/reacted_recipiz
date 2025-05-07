import React, { useState } from 'react';
import './Assistant.css';

const Assistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setResponse('');

    try {
      // TODO: Implement actual API call to backend assistant service
      // For now, we'll simulate a response
      setTimeout(() => {
        setResponse(`I understand you're looking for help with "${query}". Here are some suggestions:

1. Check out our recipe collection for similar dishes
2. Consider these cooking tips:
   - Always read the recipe completely before starting
   - Prepare all ingredients before beginning
   - Use proper measuring tools
   - Follow cooking times carefully

Would you like me to provide more specific guidance on any of these points?`);
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to get response from assistant');
      setLoading(false);
    }
  };

  return (
    <div className="assistant">
      <div className="header">
        <h1>Cooking Assistant</h1>
        <p>Ask me anything about cooking, recipes, or kitchen tips!</p>
      </div>

      <form onSubmit={handleSubmit} className="query-form">
        <div className="form-group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., How do I make fluffy pancakes?"
            className="query-input"
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Thinking...' : 'Ask'}
          </button>
        </div>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Thinking...</p>
        </div>
      )}

      {response && (
        <div className="response">
          <h3>Assistant's Response:</h3>
          <div className="response-content">
            {response.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      )}

      <div className="suggestions">
        <h3>Try asking about:</h3>
        <ul>
          <li>Recipe substitutions</li>
          <li>Cooking techniques</li>
          <li>Ingredient storage</li>
          <li>Meal planning</li>
          <li>Kitchen equipment</li>
        </ul>
      </div>
    </div>
  );
};

export default Assistant; 