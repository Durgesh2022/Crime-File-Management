import React, { useState } from 'react';
import './form.css'; // Optional: Create your CSS for styling
import axios from 'axios'; // Axios for making HTTP requests

const DiaryForm2 = () => {
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    description: '',
    document: null, // Adding a document field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      document: file, // Store the uploaded document in state
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Create a new FormData instance to handle the form data and file
    

    try {
      const response = await axios.post('http://localhost:5000/api/diary', formData);
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting the form:', error);
    }

    // Reset the form after successful submission
    setFormData({
      date: '',
      name: '',
      description: '',
      document: null,
    });
  };

  return (
    <div className="form-container">
      <h1>Update Diary</h1>
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
          <h2>Name:</h2>
          <input
            type="text"
            name="name"
            value={formData.name}
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
          <h2>Upload Document:</h2>
          <input
            type="file"
            name="document"
            accept=".pdf,.doc,.docx" // Accept PDF, DOC, and DOCX formats
            onChange={handleFileChange}
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default DiaryForm2;
