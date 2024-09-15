import React from 'react';
import './styles.css';

const ProgressBar = ({ progress }) => {
  
  const progressWidth = `${progress}%`;

  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: progressWidth }}></div>
    </div>
  );
};

export default ProgressBar;
