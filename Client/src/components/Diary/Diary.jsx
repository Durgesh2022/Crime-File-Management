import React, { useEffect, useState } from 'react';
import './Diary.css'; // Assuming you have your CSS here
import Vara from 'vara'; // Importing Vara.js

const Diary = () => {
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    description: '',
  });

  useEffect(() => {
    const winWidth = window.innerWidth;
    const ratio = winWidth / 1920;
    let fontSize = { small: 12, medium: 14 };
    const bodyFontSize = Math.max(16 * ratio, 10);
    const posX = Math.max(80 * ratio, 30);
    document.body.style.fontSize = `${bodyFontSize}px`;
    fontSize.small = Math.max(fontSize.small * ratio, 7);
    fontSize.medium = Math.max(fontSize.medium * ratio, 10);

    let played = [0, 0, 0];
    let vara = [];

    const currentDate = new Date();

    // Format the date (you can adjust this format as needed)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);

    // Vara.js setup for first container
    vara[0] = new Vara(
      "#vara-container-1",
      "https://rawcdn.githack.com/akzhy/Vara/ed6ab92fdf196596266ae76867c415fa659eb348/fonts/Satisfy/SatisfySL.json",
      [
        { text: formattedDate, textAlign: "right", y: 20, x: -30, delay: 500, duration: 1500, fontSize: fontSize.small },
        { text: "Durgesh Tiwari", y: 40, x: posX, duration: 4000 },
        { text: "Like with a library,", id: "sphinx", x: posX, delay: 1000, duration: 4500 },
        { text: "..... that can animate text writing", id: "end", color: "#3f51b5", delay: 1000, x: posX, duration: 4500 }
      ],
      { strokeWidth: 2, fontSize: fontSize.medium, autoAnimation: false }
    );

    // Vara.js setup for second container
    vara[1] = new Vara(
      "#vara-container-2",
      "https://rawcdn.githack.com/akzhy/Vara/ed6ab92fdf196596266ae76867c415fa659eb348/fonts/Satisfy/SatisfySL.json",
      [
        { text: "16 Jan 2019", textAlign: "right", delay: 500, y: 20, x: -30, duration: 1500, fontSize: fontSize.small },
        { text: "Try to create something else.", y: 40, x: posX, duration: 4000 },
        { text: "Like a diary or a todo list.", y: 40, x: posX, duration: 3500 }
      ],
      { strokeWidth: 2, fontSize: fontSize.medium, autoAnimation: false }
    );

    // Vara.js setup for third container
    vara[2] = new Vara(
      "#vara-container-3",
      "https://rawcdn.githack.com/akzhy/Vara/ed6ab92fdf196596266ae76867c415fa659eb348/fonts/Satisfy/SatisfySL.json",
      [
        { text: "17 Jan 2019", textAlign: "right", delay: 500, y: 20, x: -30, duration: 1500, fontSize: fontSize.small },
        { text: "Creating a Diary.", y: 40, x: posX, duration: 4000 },
        { text: "View the library on,", y: 20, x: posX, duration: 3500 },
        { text: "Github.", y: 10, color: "#3f51b5", id: "link", x: posX, duration: 1500 }
      ],
      { strokeWidth: 2, fontSize: fontSize.medium, autoAnimation: false }
    );

    // Animation triggering logic
    vara[2].ready(() => {
      document.querySelectorAll(".front:not(.last)").forEach((element, index) => {
        element.addEventListener('click', () => {
          document.querySelector(".book").classList.add("open");
          element.parentElement.classList.add("open");
          if (!played[index]) {
            vara[index].playAll();
            vara[index].animationEnd(() => {
              played[index] = 1;
            });
          }
        });
      });
    });

    // Back button logic
    const backButtons = document.querySelectorAll('.back');
    backButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        if (index === 0) {
          document.querySelector(".book").classList.remove("open");
        }
        button.parentElement.classList.remove("open");
      });
    });

    // Cleanup function to remove event listeners
    return () => {
      backButtons.forEach((button) => {
        button.removeEventListener('click', () => {});
      });
      document.querySelectorAll(".front:not(.last)").forEach((element) => {
        element.removeEventListener('click', () => {});
      });
    };

  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic here
  };

  return (
    <div>
    <div className="diary-app">
      <div className="v-center"></div>
      <div id="container">
        <div className="book">
          <div className="first paper">
            <div className="page front contents">
              <div className="intro">
                <h2>Crime File</h2>
                <h1>2024</h1>
              </div>
            </div>
            <div className="page back"><div className="back">Back</div></div>
          </div>
          <div className="second paper">
            <div className="page front contents">
              <div id="vara-container-1"></div>
            </div>
            <div className="page back"><div className="back">Back</div></div>
          </div>
          <div className="third paper">
            <div className="page front contents">
              <div id="vara-container-2"></div>
            </div>
            <div className="page back"><div className="back">Back</div></div>
          </div>
          <div className="fourth paper">
            <div className="page last front contents">
              <div id="vara-container-3"></div>
            </div>
            <div className="page back"><div className="back">Back</div></div>
          </div>
          <div className="side"></div>
          <div className="bottom"></div>
          <div className="shadow"></div>
        </div>
      </div>
     
    </div>
    
     
      </div>
  );
};

export default Diary;
