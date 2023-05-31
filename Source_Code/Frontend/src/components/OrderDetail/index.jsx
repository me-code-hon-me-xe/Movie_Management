
import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../context/UserContext';

import axios from 'axios';
import './style.scss';
import MovieDetail from '../MovieDetail';
import SeatOrderItem from '../SeatOrderItem';
import FoodDrinkOrderItem from '../FoodDrinkOrderItem';

export default function ({ selectedMovie, selectedShowtime, selectedShowtimeSpot, selectedFoods, selectedDrinks, selectedSeats, selectedTheaterRoom }) {

    const { jwtToken } = useContext(UserContext)

    const date = new Date(selectedShowtime.date)
    const month = date.toLocaleDateString('en-US', { month: 'short' }); // May
    const dayOfMonth = date.toLocaleDateString('en-US', { day: 'numeric' }); // 23
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' }); // Tue

    let start = formatTime(selectedShowtimeSpot.split("-")[0])
    let end = formatTime(selectedShowtimeSpot.split("-")[1])

    let totalSeatPrice = 0
    selectedSeats.forEach(seat => {
        totalSeatPrice += Number(seat.price)
    })
    let totalFoodPrice = 0
    selectedFoods.forEach(item => {
        totalFoodPrice += Number(item.item.price * item.quantity)
    })

    let totalDrinkPrice = 0
    selectedDrinks.forEach(item => {
        totalDrinkPrice += Number(item.item.price * item.quantity)
    })

    let totalPrice = totalSeatPrice + totalFoodPrice + totalDrinkPrice
    function formatTime(time) {
        let formattedTime = null;
        if (Number(time) < 12) {
            formattedTime = time + " AM"
        } else {
            formattedTime = time + " PM"
        }

        return formattedTime
    }

    const handleSave = () => {

    }
    return (
        <div className="OrderDetail">
            <div className="text">Order Details</div>
            <div className="movie-container">
                <MovieDetail
                    movieId={selectedMovie._id}
                    displayLargePoster={false}
                />
            </div>

            <div className="showtime-info-container">
                <h1 className='text'>Showtime information:</h1>
                <div className="showtime-info">
                    <p className="month">{month}</p>
                    <p className="dayOfMonth">{dayOfMonth}</p>
                    <p className="dayOfWeek">{dayOfWeek}</p>
                    <p>|</p>
                    <p className="showtime-spot">{start} - {end}</p>
                </div>

            </div>


            <div className="seat-info">
                <h1 className='text'>Purchased Seat:</h1>
                <div className="heading">
                    <p className="seatCode-text">Seatcode</p>
                    <p className="theater-room-text">Theater Room</p>
                    <p className="price-text">Price</p>
                </div>
                <div className="seat-order-item-container">
                    {selectedSeats.map(seat => {
                        return <SeatOrderItem
                            row={seat.row}
                            col={seat.col}
                            price={seat.price}
                            theaterRoomName={selectedTheaterRoom.name}
                        />
                    })}
                </div>
                <p className="totalPrice">Total: ${totalSeatPrice}</p>
            </div>

            <div className="item-container">


                <h1 className='text'>Purchased Food:</h1>
                <div className="item-container">
                    {selectedFoods.map(item => {
                        return <FoodDrinkOrderItem
                            image={item.item.image}
                            name={item.item.name}
                            quantity={item.quantity}
                            price={item.item.price}
                        />
                    })}
                </div>
                <p className="totalPrice">Total: ${totalFoodPrice}</p>

                <h1 className='text'>Purchased Drink:</h1>
                <div className="item-container">
                    {selectedDrinks.map(item => {
                        return <FoodDrinkOrderItem
                            image={item.item.image}
                            name={item.item.name}
                            quantity={item.quantity}
                            price={item.item.price}
                        />
                    })}
                </div>
                <p className="totalPrice">Total: ${totalDrinkPrice}</p>

            </div>

            <div className="bill">
                <div className="text-container">
                    <p className="seat-price">Seat price:</p>
                    <p className='food-price'>Food price:</p>
                    <p className='drink-price'>Drink price:</p>
                    <p className="order-total-price">Order total price:</p>

                </div>
                <div className="price-container">
                    <p className="seat-price">${totalSeatPrice}</p>
                    <p className='food-price'>${totalFoodPrice}</p>
                    <p className='drink-price'>${totalDrinkPrice}</p>
                    <p className="order-total-price">${totalPrice}</p>
                </div>
            </div>


        </div>
    )

}