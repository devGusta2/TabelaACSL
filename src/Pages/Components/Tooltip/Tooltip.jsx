import React, { useRef, useState, useEffect } from 'react';
import './Tooltip.css';

const TooltipAjuda = ({ text, children }) => {
    const tooltipRef = useRef(null);
    const containerRef = useRef(null);
    const [position, setPosition] = useState('right');

    useEffect(() => {
        const tooltip = tooltipRef.current;
        const container = containerRef.current;

        if (tooltip && container) {
            const tooltipRect = tooltip.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            // Se o tooltip ultrapassa a tela à direita
            if (tooltipRect.right > window.innerWidth) {
                setPosition('left');
            } else {
                setPosition('right');
            }
        }
    }, [text]);

    return (
        <div className="tooltip-container" ref={containerRef}>
            <div className="icon-info">i</div>
            <div
                ref={tooltipRef}
                className={`tooltip ${position === 'left' ? 'tooltip-left' : 'tooltip-right'}`}
                dangerouslySetInnerHTML={{ __html: text }}
            />
            {children}
        </div>
    );
};

export default TooltipAjuda;
