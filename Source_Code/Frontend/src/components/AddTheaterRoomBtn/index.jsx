import React from 'react';
import './style.scss';
import { truncateString } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

export default function () {

    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/add-theater-room')
    }
    return (
        <div className='AddRoomBtn' onClick={handleClick}>
            <p><i class="fa-solid fa-plus"></i></p>
        </div>

    )
    
}