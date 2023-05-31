import React from 'react';
import './style.scss';
import Button from '../../components/Button';
import CinemaImage from '../../images/cinema.png'
import TheaterRoomImage from '../../images/theater_room.png'
import FoodDrinkImage from '../../images/food_drink.png'
import StaffImage from '../../images/staff.png'
import HistoryImage from '../../images/history.png'
import TicketImage from '../../images/ticket.png'

export default function () {
    return (
        <div className='homepage'>
            <div className="heading">
                <div className="heading-text-container">
                    <h1>Welcome back Hassan, let’s set up the cinema now!</h1>
                    <p><i class="fa-solid fa-circle-check"></i>Buy tickets online, experience good movies</p>
                    <p><i class="fa-solid fa-circle-check"></i>Book tickets directly, pay now</p>
                    <p><i class="fa-solid fa-circle-check"></i>Cheap movie tickets with many offers</p>
                    <p><i class="fa-solid fa-circle-check"></i>Cheap movie tickets with many offers</p>
                </div>

                <div className="heading-image">
                    <img src="https://images.unsplash.com/photo-1608170825938-a8ea0305d46c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNpbmVtYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" alt="" />
                </div>
            </div>

            <div className="btn-container">
                <Button
                    imageLink={CinemaImage}
                    text='Manage Movie'
                />
                <Button
                    imageLink={TheaterRoomImage}
                    text='Manage Theater Room'
                />
                <Button
                    imageLink={FoodDrinkImage}
                    text='Manage Food & Drink'
                />
                <Button
                    imageLink={StaffImage}
                    text='Manage Staff'
                />
{/* 
                <Button
                    imageLink={TicketImage}
                    text='Create Order'
                />
                <Button
                    imageLink={HistoryImage}
                    text='Order History'
                /> */}

            </div>
        </div>
    )
}