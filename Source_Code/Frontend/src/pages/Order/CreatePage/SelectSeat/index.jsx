
import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../../../context/UserContext';

import './style.scss';
import SeatInfo from '../../../../components/SeatInfo';
import SeatChart from '../../../../components/SeatChart';
import axios from 'axios';
export default function ({ selectedShowtime, selectedMovie, selectedShowtimeSpot, selectedSeats, setSelectedSeats,selectedTheaterRoom, setSelectedTheaterRoom }) {

    const { jwtToken } = useContext(UserContext)
    const [tickets, setTickets] = useState([]);

    console.log("selected shotime: ", selectedShowtime);
    console.log("selected movie: ", selectedMovie);
    console.log("selected showtime spot: ", selectedShowtimeSpot);


    useEffect(() => {
        fetchSeatchartInfo();
    }, [])

    const fetchSeatchartInfo = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        };
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/seatchart-by-showtime?showtimeDate=${selectedShowtime.date.toString()}&movieId=${selectedMovie._id.toString()}&showtimeSpot=${selectedShowtimeSpot.toString()}`, config);
        if (response.data.success) {
            const data = response.data.data
            console.log(data);
            setSelectedTheaterRoom(data.theaterRoom)
            setTickets(data.tickets);
        }
    }
    return (
        <div className="step-3">
            <div className="seat-info">
                <p className="seat-info-text">
                    {selectedSeats.length < 2 ? `${selectedSeats.length} Selected Seat` : `${selectedSeats.length} Selected Seats`}
                </p>
                <div className="selected-seat-container">
                    {selectedSeats.map((seat, index) => {
                        return (
                            <SeatInfo
                                key={index}
                                row={seat.row}
                                col={seat.col}
                                price={seat.price}
                            />
                        )
                    })}

                </div>
            </div>
            {selectedTheaterRoom &&
                <div className="seat-chart-container">
                    <SeatChart
                        rowNum={selectedTheaterRoom.rowNum}
                        selectedSeats={selectedSeats}
                        seatNumPerRow={selectedTheaterRoom.seatNumPerRow}
                        setSelectedSeats={setSelectedSeats}
                        tickets={tickets}
                    />
                </div>
            }

        </div>
    )
}