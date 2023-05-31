import React from 'react';
import './style.scss';

    function formatTime(time) {
        let formattedTime = null;
        if (Number(time) < 12) {
            formattedTime = time + " AM"
        } else {
            formattedTime = time + " PM"
        }

        return formattedTime
    }

export default function ({ spot, isActive, onClick }) {
    let start = formatTime(spot.split("-")[0])
    let end = formatTime(spot.split("-")[1])

    const style = isActive ? 'spot-active' : ''
    return (
        <div className={`Spot ${style}`} onClick={onClick}>
            <div className="time">{start} - {end}</div>
        </div>
    )
}