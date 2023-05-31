import React from 'react';
import './style.scss';

export default function ({ image, name, active, onClick }) {
    const style = active ? "room-active" : "";
    return (
        <div className={`Room ${style}`} onClick={() => onClick()}>
            <img className='room-image' src={image} alt="" />
            <p className='room-name'>{name}</p>
        </div>
    )
}