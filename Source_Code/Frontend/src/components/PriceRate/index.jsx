import React from 'react';
import './style.scss';
import Seat from '../Seat';
import SeatChart from '../SeatChart';
export default function ({ color, from, to, price, deleteable, onDelete }) {
    const colorStyle = { backgroundColor: color }
    return (
        <div className="PriceRate" style={colorStyle}>
            {deleteable
                &&
                <p className='deleteBtn' onClick={onDelete}><i class="fa-sharp fa-solid fa-xmark"></i></p>
            }
            <div className="from-to">
                <p className='row-text'>Row from {from} to {to}</p>
            </div>


            <div className="price">
                <p className='price-text'>Price : ${price}</p>
            </div>

        </div>
    )
}