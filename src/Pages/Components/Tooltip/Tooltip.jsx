import React from 'react';
import './Tooltip.css';

const Tooltip = ({ text, children }) => {
    return (
        <div className="tooltip-container">
            <div className="icon-info">i</div>
            <div className="tooltip" dangerouslySetInnerHTML={{ __html: text }} />
            {children}
        </div>
    );
};

export default Tooltip;