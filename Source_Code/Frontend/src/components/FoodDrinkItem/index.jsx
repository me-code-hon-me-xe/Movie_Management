import React, { useEffect, useState } from 'react';
import './style.scss';
import { truncateString } from '../../utils/utils';
//TODO: isActive => isSelected
export default function ({ itemId,itemImage, itemName, itemDescription, itemPrice, onClick, isActive, handleUnselect , handleChangeQuantity}) {


    const [quantity, setQuantity] = useState(1)
    const handleAdd = () => {
        setQuantity(prevVal => prevVal + 1)
        handleChangeQuantity(itemId, quantity + 1)
    }

    useEffect(() => {
        setQuantity(1)
    }, [isActive])
    const handleSubstract = (e) => {


        if (quantity == 1) {
            // since the subtract button is inside the Item,
            // we need to prevent the propagation so that it not trigger the onClick of the Item
            handleClickUnselect(e)
        }

        setQuantity(prevVal => prevVal - 1)
        handleChangeQuantity(itemId, quantity - 1)
        // handleClickUnselect(e)


    }

    const handleClickUnselect = (e) => {
        e.stopPropagation()
        handleUnselect()
    }

    const style = isActive ? "item-active" : "";
    return (
        <div className={`Item ${style}`} onClick={onClick}>

            {
                isActive &&
                <p className="unselect-text" onClick={handleClickUnselect}>
                    Unselect
                </p>
            }
            <img src={itemImage} alt="" className="item-image" />
            <p className="item-name">{truncateString(itemName, 10)}</p>
            <p className='item-description'>{truncateString(itemDescription, 10)}</p>
            <p className="item-price">${itemPrice}</p>



            {isActive &&
                <div className="quantity-box">
                    <p className="quantity-btn"><i class="fa-solid fa-minus" onClick={handleSubstract}></i></p>
                    <input className="quantity-input" type="number" value={quantity} />
                    <p className="quantity-btn"><i class="fa-solid fa-add" onClick={handleAdd}></i></p>
                </div>
            }
        </div>
    )
}