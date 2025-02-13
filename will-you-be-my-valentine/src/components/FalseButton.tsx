import React, { useState } from 'react';
import './css/FalseButton.css'; // Import the CSS file
import { Button } from '@mui/material';

const decisionButton = {
  color: 'white',
  marginX: '50px',
  height: '36px',
  backgroundColor: '#df4646',
  '&:hover': {
    backgroundColor: '#a70808'
  }
};


const FalseButton = ({ className, onClick, disabled }) => {
  const [isPeeled, setIsPeeled] = useState(false);

  const handleClick = () => {
    setIsPeeled(true);
    onClick();
  };

  return (
      <Button
        disabled={disabled}
        sx={{
          ...decisionButton
        }}
        className={`peel-button ${isPeeled ? 'peeled' : ''} ${ className || ''}`} 
        onClick={handleClick}
      >
        <span className="no-label">No</span>
        <span className="yes-label">Yes</span>
      </Button>
  );
};

export default FalseButton;