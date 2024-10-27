import React, { useState } from 'react';
import './form.css'; // Optional: CSS for styling
import axios from 'axios'; // Axios for making HTTP requests

const DiaryForm = () => {
  const [formData, setFormData] = useState({
    caseNo: '',
    name: '',
    date: '',
    description: '',
  });
  const [image, setImage] = useState(null); // State to hold the uploaded image file
  const [searchResult, setSearchResult] = useState(null); // State to hold search results
  const [isEntryFound, setIsEntryFound] = useState(false); // State to manage the found entry

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the uploaded image file
  };

  const searchDiaryEntry = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/diary/search', {
        params: {
          name: formData.name,
          caseNo: formData.caseNo,
        },
      });
      setSearchResult(response.data); // Store the found entries
      setIsEntryFound(response.data && response.data.length > 0); // Check if entry exists
    } catch (error) {
      console.error('Error searching for diary entries:', error);
      setSearchResult([]); // Set to empty if there’s an error
      setIsEntryFound(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchDiaryEntry(); // Call the search function on form submit
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object for sending both text data and image
    const data = new FormData();
    data.append('caseNo', formData.caseNo);
    data.append('date', formData.date);
    data.append('name', formData.name);
    data.append('description', formData.description);
    if (image) {
      data.append('image', image); // Attach image if available
    }

    try {
      const response = await axios.post('http://localhost:5000/api/diary', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      });
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting the form:', error);
    }

    // Reset form after submission
    setFormData({
      caseNo: '',
      date: '',
      name: '',
      description: '',
    });
    setImage(null); // Clear the image upload
    setSearchResult(null); // Clear the search result
    setIsEntryFound(false); // Reset entry found state
  };

  return (
    <div className="form-container">
      <h1>Diary Entry</h1>
      
      {/* Search Form */}
      <form onSubmit={handleSearchSubmit}>
        <label>
          <h2>Case No:</h2>
          <input
            type="text"
            name="caseNo"
            value={formData.caseNo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <h2>Name:</h2>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Search</button>
      </form>

      {/* Display Search Results */}
      {searchResult && searchResult.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {searchResult.map((entry) => (
              <li key={entry._id}>
                <strong>Case No:</strong> {entry.caseNo} <br />
                <strong>Name:</strong> {entry.name} <br />
                <strong>Description:</strong> {entry.description}
                {entry.image && (
                  <div className="entry-image">
                    <p><strong>Uploaded Image:</strong></p>
                    <img
                      src={`http://localhost:5000/${entry.image}`} // Ensure this path aligns with your server setup
                      alt="Uploaded document"
                      className="uploaded-image"
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Add Form - displayed if entry is found */}
      {isEntryFound && (
        <form onSubmit={handleSubmit}>
          <label>
            <h2>Date:</h2>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <h2>Description:</h2>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <h2>Upload Image:</h2>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          <button type="submit">Add Entry</button>
        </form>
      )}
    </div>
  );
};

export default DiaryForm;
