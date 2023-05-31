import React from 'react';
import './style.scss';
import Seat from '../Seat';
export default function({row, seatNumPerRow, selectedSeats, setSelectedSeats, rowColor, ticketByRow}) {
    const handleClick = (row, col) => {
        setSelectedSeats(prevVal => {
            // ignore the same seat is added twice
            if (prevVal.some((seat) => seat.row == row && seat.col == col)) return prevVal
            const selectedSeat = {
                row,
                col
            }

            if (ticketByRow && ticketByRow.length > 0) {
                selectedSeat.price = ticketByRow[row][0].price // all tickets in the same row has the same price
                selectedSeat.ticket = ticketByRow[row][col]
            }
            console.log('selected seat: ');
            console.log(selectedSeat);
            return [...prevVal, selectedSeat]
        })
    } 
    return (
        <div className="SeatRow">
            {Array.from(Array(Number(seatNumPerRow)).keys()).map(col => {
                return (
                    <Seat 
                        row={row}
                        col={col}
                        ticket={ticketByRow ? ticketByRow[row]?.find(ticket => ticket.col == col) : null}
                        onClick={() => handleClick(row, col)}
                        color={rowColor}
                        selectedSeats={selectedSeats}
                    />
                )
            })}
    </div>
    )
}