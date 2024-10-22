import React from 'react';
import './Record.css'; // Assuming you have some global styles here
import Diary from './Diary/Diary'; // Updated path for the Diary component
import DiaryForm from './Form/Form';
import DiaryForm2 from './Form/Form2';
import DiarySearchForm from './DiarySearchForm';

const Record = ({ title }) => {
  return (
    <div>
      <div className="App">
        <div className="diary-box">
          <div className="diary">
            <Diary />
          </div>
          <div className="form">
            {/* Conditional rendering based on the title */}
            {title === 'Police Officer' && <DiaryForm />}
            {title === 'Investigating Officer' && <DiaryForm2 />}
            {title === 'Judge' && <DiarySearchForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Record;
