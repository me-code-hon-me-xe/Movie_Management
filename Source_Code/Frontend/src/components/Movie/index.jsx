import React from 'react';
import './style.scss';
import { formatDate, truncateString } from '../../utils/utils';

export default function ({ posterLink , movieTitle, releaseDate, onClick, isActive, blur }) {

    const formattedDate = formatDate(releaseDate)
    
    let style = isActive ? 'movie-active' : ''
    if (blur) {
        style += ' blur'
    }
    return (
        <div className={`Movie ${style}`} onClick={onClick}>
            <img className='movie-poster' src={posterLink} alt="" />
            <div className="movie-info">
                <p className='movie-title'>{truncateString(movieTitle, 10)}</p>
                <p className="release-date">{formattedDate}</p>
            </div>
        </div>
    )
}