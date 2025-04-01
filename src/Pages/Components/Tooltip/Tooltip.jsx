import React from 'react';
import './Tooltip.css';

const Tooltip = ({ text, children }) => {
    return (
        <div className="tooltip-container">
            <div className="icon-info">i</div>
            <div className="tooltip">
                {text}
            </div>
            {children}
        </div>
    );
};

export default Tooltip;