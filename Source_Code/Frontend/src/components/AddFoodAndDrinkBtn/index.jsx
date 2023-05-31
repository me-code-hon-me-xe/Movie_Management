import React from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
export default function () {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/add-food-and-drink')
    }
    return (
        <div className='AddFoodAndDrinkBtn' onClick={handleClick}>
            <p><i class="fa-solid fa-plus"></i></p>
        </div>
    )
}