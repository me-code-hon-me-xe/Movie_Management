import React from 'react';
import './style.scss';

export default function ({image, name, price, quantity }) {
    return (
        <div className="FoodOrderItem">
            <img className="itemImage" src={image} alt=""  />
            <p className="itemName">{name}</p>
            <p className="unitPrice">${price}</p>
            <p className="quantity">{quantity}</p>
            <p className="total">${price * quantity}</p>
        </div>
    )
}