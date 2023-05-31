import React from 'react';
import './style.scss';

import OrderDetail from '../../../components/OrderDetail';
export default function () {

    const movieTitle = "The Power of the Dog";
    const posterLink = 'https://th.bing.com/th/id/OIP.dO2JvwZyumycPLEDuiGUOwHaLa?w=186&h=287&c=7&r=0&o=5&dpr=1.3&pid=1.7'
    const releaseDate = 'April 1987'
    return (
        
        <OrderDetail
            movieTitle={movieTitle}
            posterLink={posterLink}
            releaseDate={releaseDate}
        />

    )
}