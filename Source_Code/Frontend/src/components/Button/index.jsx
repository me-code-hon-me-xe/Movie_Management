import React from 'react';
import './style.scss';

export default function ({imageLink, text}) {
    return (
        <div className="Button">
            <img className='btn-image' src={imageLink} alt="" />
            <p className='btn-text'>
                {text}
            </p>
        </div>
    )
}