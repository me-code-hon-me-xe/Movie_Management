import React from 'react';
import './style.scss';

export default function ({row, col, onClick, color, ticket, selectedSeats}) {
    const colorStyle = {backgroundColor: color}
    if (!color) {
        colorStyle.backgroundColor = 'var(--primary-color)'
    }

    if (ticket) {
        if (ticket.status !== 'available') {
            colorStyle.backgroundColor = 'var(--color-gray)'
        }
    }

    if (selectedSeats) {
        console.log('hey');
        if (selectedSeats.some(seat => seat.row == row && seat.col == col)) {
            colorStyle.backgroundColor = '#FC2947'
        }
    }
    return (
        <div className="Seat" onClick={onClick} style={colorStyle}>
            <p className='rowNum'>R{row + 1}</p>
            <p className="seatNum">{(col + 1)}</p>
        </div>
    )
}