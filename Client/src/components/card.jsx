// Card.js
import React from 'react';
import './Card.css'; // Import the CSS file for styling

const Card = ({ image, title, name, email, designation }) => {
  return (
    <div className="card">
     
      <div className="card-info">
        <h1>{title}</h1>
        <h2>Name: {name}</h2>
        <h3>Email: {email}</h3>
        <h3>Desigination: {designation}</h3>
      </div>
      <div className="card-image">
        <img src={image} alt={name} />
      </div>
    </div>
  );
};

export default Card;
