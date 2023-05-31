import React from 'react';
import './style.scss';

export default function ({row, col, price, theaterRoomName}) {
    return (
        <div className="SeatOrderItem">
            <p className="seatCode">R{row + 1}.{col+1}</p>
            <p className="theaterRoomName">{theaterRoomName}</p>
            <p className="price">${price}</p>
        </div>
    )
}