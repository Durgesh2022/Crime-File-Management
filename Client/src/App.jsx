import React from 'react';
import './App.css'; // Assuming you have some global styles here
import Record from './components/Reacord';
import Card from './components/card';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
const App = () => {
  const cardData = {
    
    title: 'Police Officer',
    name: 'John Doe',
    email: 'john.doe@example.com',
    designation: 'Software Engineer',
  };

  const getImageUrl = (title) => {
    if (title === 'Police Officer') {
      return 'https://img.freepik.com/free-photo/3d-cartoon-style-character_23-2151034130.jpg?w=1060&t=st=1729520860~exp=1729521460~hmac=2b82a1340d10e52d5e9af13420551842a21379918117d68d2b704f9077f9d79a';
    } else if (title === 'Investigating Officer') {
      return 'https://img.freepik.com/free-photo/view-3d-man-working-justice-law-field_23-2151228054.jpg?t=st=1729524289~exp=1729527889~hmac=c0274727e7cfc31fc44bf324cbefa2142b0a7941af74baec3f2cf695ff6bb68e&w=740';
    }
    else if (title === 'Judge') {
      return 'https://img.freepik.com/free-photo/view-3d-male-lawyer-suit_23-2151228116.jpg?t=st=1729545670~exp=1729549270~hmac=6cf5600f430436c43369fa957a176ae677d32794bccd408350a0ec3cb99df06c&w=996';
    }
    return ''; // Default case (if title doesn't match)
  };


  return (
    <div>
      <Navbar />
      <Card 
        image={getImageUrl(cardData.title)} 
        title={cardData.title} 
        name={cardData.name} 
        email={cardData.email} 
        designation={cardData.designation} 
      />
    
    <div className="App">
     
      <div>
      <Record title={cardData.title} />
      </div>
   
    </div>
    <Footer />
    </div>
  );
};

export default App;
