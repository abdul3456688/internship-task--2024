import React from 'react';
import '../Tile.css';

export default function Tile({ value, onClick, isSelected }) {
    return (
        <div  className={`tile ${isSelected ? 'selected' : ''}`} onClick={onClick}>
            {value}
        </div>
    );
}
