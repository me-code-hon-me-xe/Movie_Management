import React from 'react';
import './style.scss';
import SeatIcon from '../../images/seat.png'
import FoodIcon from '../../images/hamburger.png'
import DrinkIcon from '../../images/cola.png'

export default function ({ movieTitle, posterLink, purchasedSeatNum, purchasedFoodNum, purchasedDrinkNum, totalPrice, onClick }) {
    // const movieTitle = "The Power of the Dog";
    // const posterLink = 'https://th.bing.com/th/id/OIP.dO2JvwZyumycPLEDuiGUOwHaLa?w=186&h=287&c=7&r=0&o=5&dpr=1.3&pid=1.7'
    const year = "2023"
    const month = "May"
    const dayOfMonth = 23
    const purchasedTime = "20:40:12"
    const showtime = "May 25"
    const showtimeSpot = "12 PM - 14 PM"
    // const purchasedSeatNum = 2;
    // const purchasedFoodNum = 2;
    // const purchasedDrinkNum = 2;
    return (
        <div>
            <div className="Order" onClick={onClick}>
                <div className="purchasedDate">

                    <div className="date">
                        <p className="year">{year}</p>
                        <p className="month">{month}</p>
                        <p className="dayOfMonth">{dayOfMonth}</p>
                        <p className="purchasedTime">{purchasedTime}</p>
                    </div>

                </div>
                <img className='posterLink' src={posterLink} alt="" />
                <div className="movieInfo">
                    <p className="movieTitle">{movieTitle}</p>
                    <p className="showtime"><span className="bold">Showtime: </span> {showtime}</p>
                    <p className="showtimeSpot"><span className="bold">Spot: </span> {showtimeSpot}</p>
                </div>
                <div className="item-container">
                    {purchasedSeatNum &&
                        <div className="purchasedSeatNum">
                            <img className='icon' src={SeatIcon} alt="" />
                            <p className='normal'>Seat</p>
                            <p className="quantity">X {purchasedSeatNum}</p>
                        </div>
                    }

                    {purchasedFoodNum > 0 &&
                        <div className="purchasedFoodNum">
                            <img className='icon' src={FoodIcon} alt="" />
                            <p className='normal'>Food</p>
                            <p className="quantity">X {purchasedFoodNum}</p>
                        </div>
                    }

                    {purchasedDrinkNum > 0 &&
                        <div className="purchasedDrinkNum">
                            <img className='icon' src={DrinkIcon} alt="" />
                            <p className='normal'>Drink</p>
                            <p className="quantity">X {purchasedDrinkNum}</p>
                        </div>
                    }

                </div>

                <div className="orderTotalPrice">
                    <p className="total-price-text">Total price</p>
                    <p className='price'>${totalPrice}</p>
                </div>
            </div>
        </div>
    )
}