import React from 'react';
import './style.scss';

export default function ({ children, showPopup, setShowPopup }) {

  const handleExit = () => {
    setShowPopup(false);
  }

  if (!showPopup) return 

  return (
    <div className="Popup">
      <div className="background" onClick={handleExit}></div>
      <div className="content-container">
        <div className='heading'>
          {/* <p className='popup-name'>Information</p> */}
          <p className='exit-btn'  onClick={handleExit}>&times;</p>
        </div>  
        {children}
      </div>
    </div>
  )
}