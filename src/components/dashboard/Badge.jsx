import React from 'react';
import PropTypes from 'prop-types';
import './Badge.css';
const Badge = ({ change }) => {
    const isPositive = change >= 0;
    const sign = isPositive ? '+' : '-';
    const backgroundColor = isPositive ? '#039855' : 'red';
    const borderColor = isPositive ? 'darkgreen' : 'darkred';

    return (
        <div className="badge" style={{ backgroundColor, borderColor }}> 
            <span className="badge-change">
                {sign}
                {Math.abs(change)}%
            </span> 
        </div>
    );
};

Badge.propTypes = {
    value: PropTypes.number.isRequired,
    change: PropTypes.number.isRequired,
    period: PropTypes.string.isRequired,
};

export default Badge;