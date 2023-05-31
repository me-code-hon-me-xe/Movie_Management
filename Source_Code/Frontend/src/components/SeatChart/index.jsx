import React, { useEffect, useState } from 'react';
import './style.scss';
import SeatRow from '../SeatRow';
//TODO: useContext for this
export default function ({ rowNum, seatNumPerRow, setSelectedSeats, selectedSeats,  rowColors, smallSize , tickets}) {

    const smallSizeStyle = smallSize ? 'small-size' : ''
    const ticketByRow = [];

    if (tickets && tickets.length > 0) {
        tickets.forEach(ticket => {
            if (ticketByRow[ticket.row]) {
                ticketByRow[ticket.row].push(ticket);
            } else {
                ticketByRow[ticket.row] = [ticket];
            }
        });
    }

    console.log('ticketbyrow');
    console.log(ticketByRow);
    return (
        <div className={`SeatChart ${smallSizeStyle}`}>
            <div className="movie-screen">
                <div className="screen"></div>
                <p className="screen-text">Screen</p>

            </div>
            <h1 className="seat-chart-text">Seat Chart</h1>

            <div className="seat-container">
                {Array.from(Array(Number(rowNum)).keys()).map((row, index) => {
                    return (
                        <>
                            <SeatRow
                                row={row}
                                seatNumPerRow={seatNumPerRow}
                                selectedSeats={selectedSeats}
                                setSelectedSeats={setSelectedSeats}
                                rowColor={rowColors ? rowColors[index] : null}
                                ticketByRow={ticketByRow}
                            />
                        </>

                    )
                })}




            </div>

        </div>
    )
}