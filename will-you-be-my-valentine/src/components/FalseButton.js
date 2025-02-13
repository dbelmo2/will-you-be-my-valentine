import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
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
    return (_jsxs(Button, { disabled: disabled, sx: {
            ...decisionButton
        }, className: `peel-button ${isPeeled ? 'peeled' : ''} ${className || ''}`, onClick: handleClick, children: [_jsx("span", { className: "no-label", children: "No" }), _jsx("span", { className: "yes-label", children: "Yes" })] }));
};
export default FalseButton;
