import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../../context/UserContext';
import axios from 'axios';
import { uploadFileToCloudinary } from '../../../utils/utils';

import './style.scss';
import SeatChart from '../../../components/SeatChart';
export default function () {
    const [roomName, setRoomName] = useState()
    const [rowNum, setRowNum] = useState(0)
    const [seatNumPerRow, setSeatNumPerRow] = useState(0)
    const [file, setFile] = useState();
    const [isDragOver, setIsDragOver] = useState(false);

    const { jwtToken } = useContext(UserContext)


    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);

        const file = e.dataTransfer.files[0];
        setFile(file)
    };

    const handleChooseFile = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    };

    const handleSave = async () => {
        let image = null;
        if (file) {
            image = await uploadFileToCloudinary(file)
        }


        const body = {
            rowNum: rowNum,
            seatNumPerRow: seatNumPerRow,
            name: roomName,
            image: image
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        };
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/admin/theater-rooms`, body,  config);
        console.log(response);
    }
    return (
        <div className='TheaterRoomCreatePage'>
            <div className="page-content">

                <div className="left">
                    <div className="item name">
                        <p className="item-text">Roon Name: </p>
                        <input type="text"
                            placeholder='Enter room name'
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                        />
                    </div>
                    <div className="item row-num">
                        <p className="item-text">Number of rows: </p>
                        <input type="number"
                            placeholder='Enter number of rows'
                            value={rowNum}
                            onChange={(e) => setRowNum(e.target.value)}
                        />
                    </div>

                    <div className="item seat-num-per-row">
                        <p className="item-text">seatNumPerRow: </p>
                        <input type="number"
                            placeholder='Enter number of seats per row'
                            value={seatNumPerRow}
                            onChange={(e) => setSeatNumPerRow(e.target.value)}
                        />
                    </div>

                    <div className="dropzone">
                        {
                            file ?
                                <div className="image-container">
                                    <img src={URL.createObjectURL(file)} />

                                    <label htmlFor="edit-btn" className="edit-btn">
                                        <i class="fa-solid fa-pen-to-square"></i>

                                        <input
                                            id="edit-btn"
                                            className="file-chooser"
                                            type="file"
                                            onChange={handleChooseFile}
                                        />

                                    </label>
                                </div>
                                :
                                <div
                                    className={`room-image ${isDragOver ? 'drag-over' : ''}`}
                                    onDragOver={handleDragOver}
                                    onDragEnter={handleDragEnter}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <label htmlFor="fileInput" className="file-label">
                                        <p className="item-text">
                                            Choose a file
                                        </p>
                                        <input
                                            id="fileInput"
                                            className="file-chooser"
                                            type="file"
                                            onChange={handleChooseFile}
                                        />
                                    </label>
                                    <p>Drag and drop the room image here</p>

                                </div>
                        }
                    </div>
                </div>


                <div className="right">
                    <SeatChart
                        rowNum={rowNum}
                        seatNumPerRow={seatNumPerRow}
                        smallSize={true}
                    />
                </div>
            </div>

            <div className="button-container">
                <div className="gradient-btn" onClick={handleSave}>Save</div>
            </div>
        </div>


    )
}