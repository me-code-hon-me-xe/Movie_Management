import React from 'react';
import './style.scss';

export default function ({showtime, onClick, isActive}) {
    const date = new Date(showtime.date)
    const month = date.toLocaleDateString('en-US', { month: 'short' }); // May
    const dayOfMonth = date.toLocaleDateString('en-US', { day: 'numeric' }); // 23
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' }); // Tue

    const style = isActive ? 'showtime-active' : ''

    return (
        <div className={`Showtime ${style}`} onClick={onClick}>
            <p className="month">{month}</p>
            <p className='days'>
                <span className="dayOfMotnh">{dayOfMonth}</span>
                |
                <span className="dayOfWeek">{dayOfWeek}</span>
            </p>

        </div>
    )
}