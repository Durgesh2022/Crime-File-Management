import React, { useState } from 'react';
import axios from 'axios'; // For making HTTP requests
import './DiarySearchForm.css'; // Import the CSS file for styling

const DiarySearchForm = () => {
  const [name, setName] = useState(''); // To store inputted name
  const [entries, setEntries] = useState([]); // To store fetched diary entries
  const [error, setError] = useState(null); // To store any error messages
  const [judgment, setJudgment] = useState(''); // To store the judgment state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before making a new request

    try {
      const response = await axios.get(`http://localhost:5000/api/diary/search?name=${name}`);
      setEntries(response.data); // Set the retrieved entries in state
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching diary entries');
    }
  };

  const handleJudgmentChange = (e) => {
    setJudgment(e.target.value); // Update judgment state based on checkbox selection
  };

  return (
    <div className="diary-search-form">
      <h1>Search Diary Entries</h1>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          <h2>Name:</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
        </label>
        <button type="submit" className="submit-button">Search</button>
      </form>

      {/* Display results */}
      {error && <p className="error-message">{error}</p>}
      {entries.length > 0 && (
        <div className="results">
          <h2>Diary Entries for "{name}":</h2>
          <ul className="entries-list">
            {entries.map((entry) => (
              <li key={entry._id} className="entry-item">
                <p><strong>Date:</strong> {new Date(entry.date).toLocaleDateString()}</p>
                <p><strong>Description:</strong> {entry.description}</p>
              </li>
            ))}
          </ul>

          {/* Final Judgment Section */}
          <h1>Final Judgment:</h1>
          <div className="judgment">
            <label className="judgment-label">
              <input
                type="radio"
                value="Guilty"
                checked={judgment === 'Guilty'}
                onChange={handleJudgmentChange}
              />
              <h3>Guilty</h3>
            </label>
            <label className="judgment-label">
              <input
                type="radio"
                value="Not Guilty"
                checked={judgment === 'Not Guilty'}
                onChange={handleJudgmentChange}
              />
              <h3>Not Guilty</h3>
            </label>
          </div>
          <textarea
            className="judgment-textarea"
            value={judgment ? `${judgment}` : ''}
            readOnly
          />
        </div>
      )}
    </div>
  );
};

export default DiarySearchForm;
