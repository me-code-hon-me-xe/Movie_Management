import React from 'react';
import './style.scss';
import Order from '../../../components/Order';
import { useNavigate } from 'react-router-dom';

export default function () {
    const orders = [
        {
            movieTitle: "The Shape of Water",
            posterLink: "https://th.bing.com/th/id/OIP.S-awXErzUfNuPsnMXng0pgHaJ4?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            purchasedSeatNum: 1,
            totalPrice: 102
        },
        {
            movieTitle: "The Shape of Water",
            posterLink: "https://th.bing.com/th/id/OIP.S-awXErzUfNuPsnMXng0pgHaJ4?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            purchasedSeatNum: 1,
            purchasedFoodNum: 2,
            purchasedDrinkNum: 3,
            totalPrice: 102,
        },
        {
            movieTitle: "The Shape of Water",
            posterLink: "https://th.bing.com/th/id/OIP.S-awXErzUfNuPsnMXng0pgHaJ4?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            purchasedSeatNum: 1,
            purchasedFoodNum: 2,
            purchasedDrinkNum: 3,
            totalPrice: 102,
        },
        {
            movieTitle: "Avengers: Infinity War",
            posterLink: "https://th.bing.com/th/id/OIP.rkUloedMWGV4rXG9TXoBLwHaLH?w=193&h=290&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            purchasedSeatNum: 4,
            purchasedFoodNum: 3,
            totalPrice: 76.5
        },
        {
            movieTitle: "Inception",
            posterLink: "https://th.bing.com/th/id/OIP.saLFP388_ITnzfhw0m3rcAHaLH?w=193&h=290&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            purchasedSeatNum: 2,
            purchasedFoodNum: 5,
            purchasedDrinkNum: 0,
            totalPrice: 87,
        },
        {
            movieTitle: "The Dark Knight",
            posterLink: "https://th.bing.com/th/id/OIP.NN9rKH-vZbFgtH4FuoW7OwHaLH?w=125&h=188&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            purchasedSeatNum: 5,
            purchasedFoodNum: 0,
            purchasedDrinkNum: 2,
            totalPrice: 65.25,
        },
        {
            movieTitle: "The Lord of the Rings: The Fellowship of the Ring",
            posterLink: "https://th.bing.com/th/id/OIP.-0AeNGLDOLpnUEcPZqrnEAHaLH?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            purchasedSeatNum: 3,
            purchasedDrinkNum: 4,
            totalPrice: 93.8,
        }, {
            movieTitle: "The Power of the Dog",
            posterLink: 'https://th.bing.com/th/id/OIP.dO2JvwZyumycPLEDuiGUOwHaLa?w=186&h=287&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            purchasedSeatNum: 1,
            purchasedFoodNum: 2,
            totalPrice: 102,
        },
        {
            movieTitle: "Inception",
            posterLink: "https://th.bing.com/th/id/OIP.saLFP388_ITnzfhw0m3rcAHaLH?w=193&h=290&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            purchasedSeatNum: 2,
            totalPrice: 87,
        },  
        {
            movieTitle: "The Dark Knight",
            posterLink: "https://th.bing.com/th/id/OIP.NN9rKH-vZbFgtH4FuoW7OwHaLH?w=125&h=188&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            purchasedSeatNum: 5,
            purchasedFoodNum: 0,
            purchasedDrinkNum: 2,
            totalPrice: 65.25,
        },
        {
            movieTitle: "The Lord of the Rings: The Fellowship of the Ring",
            posterLink: "https://th.bing.com/th/id/OIP.-0AeNGLDOLpnUEcPZqrnEAHaLH?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            purchasedSeatNum: 3,
            purchasedFoodNum: 1,
            purchasedDrinkNum: 4,
            totalPrice: 93.8,
        }, {
            movieTitle: "The Power of the Dog",
            posterLink: 'https://th.bing.com/th/id/OIP.dO2JvwZyumycPLEDuiGUOwHaLa?w=186&h=287&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            purchasedSeatNum: 3,
            purchasedDrinkNum: 3,
            totalPrice: 102,
        }
    ]
    const navigate = useNavigate()
    return (
        <div className="ViewAllOrderPage">

            <div className="order-history-text">Order History</div>

            <div className="order-container">
                {orders.map(order => {
                    return <Order 
                        movieTitle={order.movieTitle}
                        posterLink={order.posterLink}
                        purchasedSeatNum={order.purchasedSeatNum}
                        purchasedFoodNum={order.purchasedFoodNum}
                        purchasedDrinkNum={order.purchasedDrinkNum}
                        totalPrice={order.totalPrice}
                        onClick={() => navigate("/order/1")}
                    />
                })}
            </div>


        </div>
    )
}