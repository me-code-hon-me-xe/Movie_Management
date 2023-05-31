import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../context/UserContext';

import './style.scss';
import MovieDetail from '../../components/MovieDetail';
import ThreaterRoom from '../../components/ThreaterRoom';
import SeatChart from '../../components/SeatChart';
import AddPriceRateButton from '../../components/AddPriceRateBtn'
import { colors } from '../../utils/utils.js'
import PriceRate from '../../components/PriceRate';
import axios from 'axios';
export default function () {

    const pathname = window.location.pathname; // "/movies/125"
    const parts = pathname.split('/'); // ["", "movie", "125"]
    const movieId = parts[parts.length - 1]; // "125"
    const [currentSelectedRoom, setCurrentSelectedRoom] = useState(null)
    const [rooms, setRooms] = useState([])
    const [priceRates, setPriceRates] = useState([]);
    const [showAddPriceBtn, setShowAddPriceBtn] = useState(false)
    const [rowColors, setRowColors] = useState([])
    const [priceRateStartRow, setPriceRateStartRow] = useState(1)
    const [selectedShowtimeDate, setSelectedShowtimeDate] = useState()
    const [selectedShowtimeSpot, setSelectShowtimeSpot] = useState("10-12")
    const { jwtToken } = useContext(UserContext)

    const setupDefaultRowColors = () => {
        const colorsArr = []
        if (currentSelectedRoom) {
            for (let i = 0; i < currentSelectedRoom.rowNum; i++) {
                colorsArr.push("#F8F6F4") // default color  
            }
        }
        return colorsArr
    }

    useEffect(() => {
        setRowColors(setupDefaultRowColors())
    }, [])

    const handleSelectRoom = (room) => {
        setCurrentSelectedRoom(room)
    }


    useEffect(() => {
        const colorArr = setupDefaultRowColors()
        setRowColors(colorArr)
        setPriceRates([]) // when user select other room, the price rates set for the current room is reset
        setPriceRateStartRow(1)
    }, [currentSelectedRoom])


    // re-colorize the seats in the seat chart after admin change the price rate array
    useEffect(() => {
        const colorArr = []

        if (currentSelectedRoom) {
            // set the colors for rows based on the price rates
            let currentRow = 0;
            for (let i = 0; i < priceRates.length; i++) {
                const color = colors[i % colors.length]
                for (let j = currentRow; j <= priceRates[i].toRow; j++) {
                    colorArr[j - 1] = color // index starts rrom 0, it first row is 1
                    currentRow++
                }
            }


            // set the rest of the rows to default color
            for (let i = currentRow; i <= currentSelectedRoom.rowNum; i++) {
                colorArr[i - 1] = "#F8F6F4" // index starts rrom 0, it first row is 1
            }

        }
        setRowColors(colorArr)

    }, [priceRates.length])


    useEffect(() => {
        console.log('selected showtimedate: ', selectedShowtimeDate);
        console.log('selected showtimeSpot: ', selectedShowtimeSpot);

        if (selectedShowtimeDate && selectedShowtimeSpot) {
            fetchAvailableTheaterRoomsAtDateAndSpot()
        }
    }, [selectedShowtimeDate, selectedShowtimeSpot])

    const fetchAvailableTheaterRoomsAtDateAndSpot = async () => {
        const formattedShowtimeDate = formatShowtimeDate(selectedShowtimeDate);

        console.log('showtimeDate: ');
        console.log(selectedShowtimeDate);
        console.log('showtimeDate: ');
        console.log(selectedShowtimeSpot);

        const config = {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }

        };

        const body = {
            showtimeDate: formattedShowtimeDate,
            showtimeSpot: selectedShowtimeSpot
        }
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/admin/theater-rooms-for-scheduling-movie`, body, config);

        if (response.data.success) {
            setRooms(response.data.data)
            setCurrentSelectedRoom(response.data.data[0]) // the first room is set as the selected by default
            console.log(response.data.data);
        }
    }

    const formatShowtimeDate = (dateString) => {
        const date = new Date(dateString);


        const day = date.getDate();
        const year = date.getFullYear();
        const month = date.getMonth() + 1

        if (month.toLocaleString().length == 1) {
            return `${year}-0${month}-${day}`
        }
        return `${year}-${month}-${day}`
    
    }

    const addMorePriceRate = () => {
        setShowAddPriceBtn(true)
    }

    const deleteLastPriceRate = () => {
        // remove the last element from the array priceRates
        const lastPriceRate = priceRates[priceRates.length - 1]
        setPriceRates(prevArr => prevArr.slice(0, prevArr.length - 1))

        setPriceRateStartRow(Number(lastPriceRate.fromRow)) // the next price will the starts from the "from row" of the deleted price rate

    }

    const handleAdd = (from, to, price) => {
        setPriceRates([...priceRates, {
            fromRow: Number(from),
            toRow: Number(to),
            price: Number(price),
        }])

        setPriceRateStartRow(Number(to) + 1)
        setShowAddPriceBtn(false)

    }

    const handleCancel = () => {
        setShowAddPriceBtn(false)
    }


    const handleSave = async () => {
        console.log('priceRates: ', priceRates);
        console.log('currentSelectedRoom: ', currentSelectedRoom);
        console.log('selectedShowtimeDate: ', selectedShowtimeDate);
        console.log('selectedShowtimeSpot: ', selectedShowtimeSpot);


        const config = {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        };

        const body = {
            showtimeDate: selectedShowtimeDate,
            showtimeSpot: selectedShowtimeSpot,
            movieId: movieId,
            theaterRoomId: currentSelectedRoom._id,
            priceRates: priceRates
        }
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/admin/showtimes`, body, config);
        console.log('response');
    }

    return (
        <div className='MovieSchedulingPage'>
            <p className="page-name">Movie Scheduling</p>

            <MovieDetail
                displayLargePoster={false}
                movieId={movieId}
            />

            <div className="date-picker-container">
                <div className="showtime-picker">
                    <p className="text">Pick a date: </p>
                    <input type="date" value={selectedShowtimeDate} onChange={e => setSelectedShowtimeDate(e.target.value)} />
                </div>
                <div className="showtime-spot-picker">
                    <p className="text">Choose showtime spot: </p>
                    <select name="" id="" value={selectedShowtimeSpot} onChange={e => setSelectShowtimeSpot(e.target.value)} >
                        <option value="10-12">10 AM - 12 AM</option>
                        <option value="12-14">12 AM - 14 AM</option>
                        <option value="14-16">14 AM - 16 AM</option>
                        <option value="16-18">16 AM - 18 AM</option>
                        <option value="18-20">18 AM - 20 AM</option>
                        <option value="20-22">20 AM - 22 AM</option>
                    </select>
                </div>


            </div>

            {rooms.length > 0 &&
                <div className="theater-room-picker">
                    <p className="text">Choose Theater room: </p>
                    <div className="theater-room-container">
                        {rooms.map((room, index) => {
                            return <ThreaterRoom
                                name={room.name}
                                image={room.image}
                                active={room._id == currentSelectedRoom._id}
                                onClick={() => handleSelectRoom(room)}
                            />
                        })}
                    </div>
                </div>
            }


            {currentSelectedRoom &&
                <div className="price-setter">
                    <div className="text">Set the pricing:</div>
                    <div className="setter">
                        <div className="room-info">
                            <h1 className="room-name">
                                {currentSelectedRoom.roomName}
                            </h1>
                            <p><span className="bold">Number of rows:</span> {currentSelectedRoom.rowNum}</p>
                            <p><span className="bold">Number of seats per row:</span> {currentSelectedRoom.seatNumPerRow}</p>
                            <p><span className="bold">Capacity:</span> {currentSelectedRoom.rowNum * currentSelectedRoom.seatNumPerRow}</p>


                            <div className="price-rate-container">
                                {priceRates.map((priceRate, index) => {
                                    return <PriceRate
                                        color={colors[index % colors.length]}
                                        deleteable={index == priceRates.length - 1} // user can only delete the last price in the list
                                        onDelete={deleteLastPriceRate}
                                        from={priceRate.fromRow}
                                        to={priceRate.toRow}
                                        price={priceRate.price}
                                    />
                                })}
                            </div>

                            {
                                showAddPriceBtn ?
                                    <AddPriceRateButton
                                        handleAdd={handleAdd}
                                        handleCancel={handleCancel}
                                        min={priceRateStartRow}
                                        max={currentSelectedRoom.rowNum}
                                        setPriceRateLastRowNum={setPriceRateStartRow} // the next price rate will start from the row at the position priceRateLastRowNum
                                        color={colors[priceRates.length % colors.length]}
                                    />
                                    :
                                    <div className="add-price-rate-btn" onClick={addMorePriceRate}>
                                        <p>Add price rate</p>
                                    </div>
                            }

                        </div>
                        <SeatChart
                            seatNumPerRow={currentSelectedRoom.seatNumPerRow}
                            rowNum={currentSelectedRoom.rowNum}
                            rowColors={rowColors}
                        />
                    </div>

                </div>
            }

            <div className="btn-container">
                <p className="gradient-btn save-btn" onClick={handleSave}>Save</p>

            </div>
        </div>
    )
}