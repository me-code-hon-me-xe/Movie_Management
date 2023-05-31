import React from 'react';
import './style.scss';

export default function ({staffImage, staffName, staffTitle, joinedDate, staffEmail, staffPhoneNumber, onClick}) {
    return (
        <div className="Staff" onClick={onClick}>
            <p className='unlocked'>Unlocked</p>

            <div className="staff-info">
                <img src={staffImage} alt="" />
                <p className="staff-name">{staffName}</p>
                <p className="staff-title">{staffTitle}</p>
            </div>
            <div className="staff-account">
                <p className='joined-date'><span className="bold">Joined at:</span> {joinedDate}</p>
            </div>
            <div className="staff-contact">
                <div className="staff-email">
                    <i class="fa-solid fa-envelope"></i>
                    <p>{staffEmail}</p>
                </div>
                <div className="staff-phone-number">
                    <i class="fa-solid fa-phone"></i>
                    <p>{staffPhoneNumber}</p>
                </div>
            </div>
        </div>
    )
}