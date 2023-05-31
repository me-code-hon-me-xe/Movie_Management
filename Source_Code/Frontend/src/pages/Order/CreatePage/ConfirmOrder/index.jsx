
import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../../../context/UserContext';

import axios from 'axios';


import './style.scss';
import MovieDetail from '../../../../components/MovieDetail';
import SeatOrderItem from '../../../../components/SeatOrderItem';
import FoodDrinkOrderItem from '../../../../components/FoodDrinkOrderItem';
import OrderDetail from '../../../../components/OrderDetail';

export default function ({ selectedMovie, selectedShowtime, selectedShowtimeSpot, selectedFoods, selectedDrinks, selectedSeats, selectedTheaterRoom }) {

    const { jwtToken } = useContext(UserContext)

    const handleConfirm = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        };
        const tickets = selectedSeats.map(seat => seat.ticket)
        const body = {
            foods: selectedFoods,
            drinks: selectedDrinks,
            tickets: tickets,
        }

        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/staff/orders`, body, config);
        if (response.data.success) {
            console.log(response);
        }

    }

    return (
        <div className="step-5">

            <OrderDetail
                selectedMovie={selectedMovie}
                selectedShowtime={selectedShowtime}
                selectedShowtimeSpot={selectedShowtimeSpot}
                selectedFoods={selectedFoods}
                selectedDrinks={selectedDrinks}
                selectedSeats={selectedSeats}
                selectedTheaterRoom={selectedTheaterRoom}
            />


            <div className="gradient-btn confirm-btn" onClick={handleConfirm}>
                Confirm
            </div>
        </div>
    )
}