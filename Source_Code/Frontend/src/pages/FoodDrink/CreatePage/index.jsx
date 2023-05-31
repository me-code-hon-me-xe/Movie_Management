import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../../context/UserContext';
import { uploadFileToCloudinary } from '../../../utils/utils';
import axios from 'axios';

import './style.scss';
//TODO: dropzone item?
export default function () {
    const { jwtToken } = useContext(UserContext)

    const [itemName, setItemName] = useState()
    const [itemPrice, setItemPrice] = useState(0)
    const [itemDescription, setItemDescription] = useState()
    const [itemType, setItemType] = useState("foods")

    const [file, setFile] = useState();
    const [isDragOver, setIsDragOver] = useState(false);

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
        //TODO: tas
        let imageLink = null;
        if (file) {
            imageLink = await uploadFileToCloudinary(file)
        }

        const body = {
            name: itemName,
            description: itemDescription,
            price: itemPrice,
            image: imageLink
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        };

        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/admin/${itemType}`, body, config);
        console.log(response);
    }
    return (
        <div className='FoodDrinkAddPage'>
            <div className="text">Add Food/Drink</div>
            <div className="page-content">
                <div className="left">
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
                                    className={`item-image ${isDragOver ? 'drag-over' : ''}`}
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
                                    <p>Drag and drop the item image here</p>

                                </div>
                        }
                    </div>
                </div>


                <div className="right">
                    <div className="item name">
                        <p className="item-text">Item Name: </p>
                        <input type="text"
                            placeholder='Enter item name'
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                    </div>
                    <div className="item price">
                        <p className="item-text">Item price: </p>
                        <input type="number"
                            placeholder='Enter item price'
                            value={itemPrice}
                            onChange={(e) => setItemPrice(e.target.value)}
                        />
                    </div>

                    <div className="item description">
                        <p className="item-text">Item price: </p>
                        <textarea type="number"
                            placeholder='Enter item description'
                            value={itemDescription}
                            onChange={(e) => setItemDescription(e.target.value)}
                        />
                    </div>

                    <div className="item type">
                        <p className="item-text">Item type: </p>
                        <select name="" id="" value={itemType} onChange={e => setItemType(e.target.value)}>
                            <option value="foods">Food</option>
                            <option value="drinks">Drink</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="btn-container">
                <p className="gradient-btn save-btn" onClick={handleSave}>Save</p>

            </div>
        </div>
    )
}