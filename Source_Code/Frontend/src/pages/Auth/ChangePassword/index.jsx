import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../../context/UserContext';
import { uploadFileToCloudinary } from '../../../utils/utils';
import axios from 'axios';

import './style.scss';

export default function () {

    const { jwtToken } = useContext(UserContext)

    const [oldPassword, setOldPassword] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const toggleOldShowPassword = () => {
        setShowOldPassword(!showOldPassword)
    }


    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const handleClickSave = async () => {
        // if (password === confirmPassword) {

        //     const body = {
        //         firstname: firstName,
        //         lastname: lastName,
        //         email: email,
        //         password: password
        //     }
        //     const config = {
        //         headers: {
        //             'Authorization': `Bearer ${jwtToken}`
        //         }
        //     };
        //     const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/admin/staffs`, body, config);
        //     console.log(response);
        // }
    }

    return (
        <div className='ChangePasswordPage'>
            <div className="text">Change password</div>
            <div className="form">
                <div className="item password">
                    <p className="item-text">Old Password: </p>
                    <input type={showOldPassword ? 'text' : 'password'}
                        placeholder='Enter old password'
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <p className="show-password-btn" onClick={toggleOldShowPassword}>
                        {showOldPassword ? 'Hide' : 'Show'}

                    </p>
                </div>


                <div className="item password">
                    <p className="item-text">New Password: </p>
                    <input type={showPassword ? 'text' : 'password'}
                        placeholder='Enter new password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="show-password-btn" onClick={toggleShowPassword}>
                        {showPassword ? 'Hide' : 'Show'}

                    </p>
                </div>

                <div className="item confirm-password">
                    <p className="item-text">Confirm New Password: </p>
                    <input type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Confirm new password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <p className="show-password-btn" onClick={toggleShowConfirmPassword}>
                        {showConfirmPassword ? 'Hide' : 'Show'}
                    </p>
                </div>


                <p className="gradient-btn save-btn" onClick={handleClickSave}>
                    Save
                </p>
            </div>
        </div >
    )
}