import './style.scss';
import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { uploadFileToCloudinary } from '../../utils/utils';
export default function () {

    const { user, setUser, jwtToken, setJwtToken } = useContext(UserContext)

    const handleLogout = () => {
        localStorage.removeItem('token')
        setJwtToken(null)
        setUser(null)
        navigate('/login')
    }

    const [bio, setBio] = useState()
    const [newCoverImageFile, setNewCoverImageFile] = useState()
    const [newAvatarImageFile, setAvatarNewImageFile] = useState()

    const [avatar, setAvatar] = useState()
    const [coverImage, setCoverImage] = useState()

    const [phoneNumber, setPhoneNumber] = useState()

    useEffect(() => {
        if (user) {
            setBio(user.bio)
            setAvatar(user.avatar)
            setCoverImage(user.coverImage)
            setPhoneNumber(user.phoneNumber)
        }
    }, [user])

    console.log(user);
    const navigate = useNavigate()

    const handleSave = async () => {

        let newAvatarImage = null;
        let newCoverImage = null;

        // if user change the avatar, then save the new avatar, otherwise, save the old
        if (newAvatarImageFile) {
            newAvatarImage = await uploadFileToCloudinary(newAvatarImageFile)
        }

        if (newCoverImageFile) {
            newCoverImage = await uploadFileToCloudinary(newCoverImageFile)
        }



        const body = {
            bio: bio,
            phoneNumber: phoneNumber,
            avatar: newAvatarImage,
            coverImage: newCoverImage
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        };
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/update-info`, body, config);
        window.location.reload()

    }

    const changeCoverImage = (e) => {
        const file = e.target.files[0]
        setNewCoverImageFile(file)
        setCoverImage(URL.createObjectURL(file))
    }


    const changeAvatarImage = (e) => {
        const file = e.target.files[0]
        setAvatarNewImageFile(file)
        setAvatar(URL.createObjectURL(file))
    }

    return (
        <div className='UserProfile'>
            <div className="image-container">
                <img src={coverImage} alt="" className="cover-image" />
                <div className="avatar-container">
                    <img src={avatar} alt="" className="avatar-image" />
                    <h1 className="user-name">{user.firstname} {user.lastname}</h1>
                </div>
            </div>

            <div className="content-container">
                <div className="user-info">
                    <p> <span className="bold">Role:</span> {user.role}</p>
                    <p className='joined-date'><span className="bold">Joined at:</span> {user.joinedDate ? user.joinedDate : "Unknown"}</p>
                    <div className="staff-contact">
                        <p className="staff-email">
                            <span className="bold">Email:</span> {user.email}
                        </p>
                        <p className="staff-phone-number">
                            <span className="bold">Phone Number:</span>
                            <input type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </p>
                    </div>
                </div>
                <div className="btn-container">

                    <label htmlFor="cover-image-change">
                        <p>Change cover image</p>
                        <input type="file" name="" id="cover-image-change" onChange={changeCoverImage} />
                    </label>

                    <label htmlFor="avatar-image-change">
                        <p>Change avatar image</p>
                        <input type="file" name="" id="avatar-image-change" onChange={changeAvatarImage} />
                    </label>
                    <p onClick={() => navigate('/change-password')}>Change password</p>
                    <p onClick={handleLogout}>Logout</p>
                </div>
            </div>

            <p className="bold">Bio</p>
            <textarea
                className="user-bio-textarea"
                value={bio}
                onChange={e => setBio(e.target.value)}
            >{user.bio}</textarea>

            <div className="btn-container">
                <p className="gradient-btn save-btn" onClick={handleSave}>Save</p>

            </div>
        </div>
    )
}