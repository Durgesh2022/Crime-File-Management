import React, { useState } from 'react';
import './form.css'; // Optional: Create your CSS for styling
import axios from 'axios'; // Axios for making HTTP requests

const DiaryForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic here (e.g., API call)
    // Reset the form if needed
    try {
      const response = await axios.post('http://localhost:5000/api/diary', formData); // POST to backend
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
    // Reset form after submission
    setFormData({
      date: '',
      name: '',
      description: '',
    });
  };

  return (
    <div className="form-container">
      <h1>Diary Entry</h1>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DiaryForm;
