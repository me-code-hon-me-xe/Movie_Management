import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../../context/UserContext';
import axios from 'axios';
import './style.scss';
import ThreaterRoom from '../../../components/ThreaterRoom';
import SeatChart from '../../../components/SeatChart';
import RoomDetail from '../../../components/RoomDetail';
import AddTheaterRoomBtn from '../../../components/AddTheaterRoomBtn';


export default function () {
    const { jwtToken } = useContext(UserContext)
    const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
    const [rooms, setRooms] = useState([])
  
    useEffect(() => {
        fetchRooms();
    }, [])

    const fetchRooms = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        };
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/theater-rooms`, config);
        if (response.data.success) {
            setRooms(response.data.data)
        }
    }


    const handleClick = (index) => {
        setCurrentRoomIndex(index);
        console.log("currentRoom index");
        console.log(currentRoomIndex);
        console.log("rooms.length: ", rooms.length);
    }

    const handleNext = () => {
        if (currentRoomIndex < rooms.length - 1) {
            setCurrentRoomIndex(prevIndex => prevIndex + 1);

        }
    }

    const handlePrev = () => {
        if (currentRoomIndex > 0) {
            setCurrentRoomIndex(prevIndex => prevIndex - 1);
        }
    }

    const defaultImage = 'https://plus.unsplash.com/premium_photo-1661762437859-c41fa943637c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'

    return (
        <div className='TheaterViewAllPage'>
            <div className="image-container">
                {currentRoomIndex > 0 && rooms[currentRoomIndex - 1]
                    ?
                    <div className="image-left">
                        <img src={rooms[currentRoomIndex - 1].image} alt="" />
                        <p className="left-btn" onClick={handlePrev}><i class="fa-solid fa-chevron-left"></i></p>
                    </div>
                    :
                    <div className="empty-box">
                    </div>
                }

                <div className="image-center">
                    <img src={rooms[currentRoomIndex]?.image || defaultImage} alt="" />
                    <p className="room-name">{rooms[currentRoomIndex]?.name}</p>
                </div> 

                {currentRoomIndex < rooms.length - 1 && rooms[currentRoomIndex + 1]
                    ?
                    <div className="image-right">
                        <img src={rooms[currentRoomIndex + 1].image} alt="" />
                        <p className="right-btn" onClick={handleNext}><i class="fa-solid fa-chevron-right"></i></p>
                    </div>
                    :
                    <div className="empty-box">
                    </div>
                }

            </div>

            <div className="room-container">
                <AddTheaterRoomBtn />
                {rooms.map((room, index) => {
                    return <ThreaterRoom
                        name={room.name}
                        image={room.image}
                        active={currentRoomIndex == index}
                        onClick={() => handleClick(index)}
                    />
                })}
            </div>

            {rooms[currentRoomIndex] && <RoomDetail
                theaterRoom={rooms[currentRoomIndex]}
            />}




        </div>


    )
}