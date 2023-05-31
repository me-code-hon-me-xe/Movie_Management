import React from 'react';
import './style.scss';
import Seat from '../Seat';
import SeatChart from '../SeatChart';
export default function ({ theaterRoom }) {
    return (
        <div className="room-detail">
            <div className="room-info">
                <h1 className="room-name">
                    {theaterRoom.name}
                </h1>
                <p><span className="bold">Number of rows:</span> {theaterRoom.rowNum}</p>
                <p><span className="bold">Number of seats per row:</span> {theaterRoom.seatNumPerRow}</p>
                <p><span className="bold">Capacity:</span> {theaterRoom.rowNum * theaterRoom.seatNumPerRow}</p>
            </div>

            <SeatChart
                rowNum={theaterRoom.rowNum}
                seatNumPerRow={theaterRoom.seatNumPerRow}
            />
        </div>
    )
}