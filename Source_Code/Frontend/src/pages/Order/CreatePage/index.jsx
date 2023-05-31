import React, { useEffect, useState } from 'react';
import './style.scss';
import "react-datepicker/dist/react-datepicker.css";

import SelectMovie from './SelectMovie';
import SelectShowtime from './SelectShowtime';
import SelectSeat from './SelectSeat';
import SelectFoodDrink from './SelectFoodDrink';
import ConfirmOrder from './ConfirmOrder';

export default function () {
    const [selectedMovie, setSelectedMovie] = useState(undefined)
    const [selectedShowtime, setSelectedShowtime] = useState(undefined)
    const [selectedShowtimeSpot, setSelectedShowtimeSpot] = useState(undefined)
    const [selectedTheaterRoom, setSelectedTheaterRoom] = useState(undefined)
    const [selectedFoods, setSelectedFoods] = useState([])
    const [selectedDrinks, setSelectedDrinks] = useState([])
    const [selectedSeats, setSelectedSeats] = useState([])


    const [message, setMessage] = useState()
    const [currentStep, setCurrentStep] = useState(1)


    useEffect(() => {
        console.log('useEffect');
        if (currentStep == 1) {
            setMessage('Please select a movie')
        } else if (currentStep == 2) {
            if (!selectedShowtime) {
                setMessage("Please select a showtime")
                return
            }
            if (!selectedShowtimeSpot) {
                console.log('asd');
                setMessage('Please select a showtime spot')
            }
        } else if (currentStep == 3) {
            setMessage('Please select one or more seats')
        } else if (currentStep == 4) {
            setMessage('Please select food and drink (optional)')
        } else if (currentStep == 5) {
            setMessage('Confirm order')
        }
    }, [currentStep, selectedShowtime])

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(pre => pre - 1)
        }
    }

    const handleNextStep = () => {

        if (currentStep < 5) {
            setCurrentStep(pre => pre + 1)
        }


    }

    const checkIfMessageIsShown = () => {
        return !checkIfAbleToNextStep();
    }

    const checkIfAbleToNextStep = () => {
        if (currentStep === 1) {
            return selectedMovie !== undefined;
        } else if (currentStep === 2) {
            return selectedShowtime !== undefined && selectedShowtimeSpot !== undefined
        } else if (currentStep === 3) {
            return selectedSeats.length > 0
        } else if (currentStep === 4) {
            return true; // selecting foods and drinks is optional, staff can move the next step without selecting anything
        }
    }

    const checkIfStepActive = (stepNum) => {
        return currentStep >= stepNum;
    }

    return (
        <div className='OrderCreatePage'>
            <div className="step-line">
                <div className="line"></div>
                <div className="step-item-container">
                    <div className={checkIfStepActive(1) ? "step-item step-item-active" : 'step-item'}>
                        <div className="step-item-number">1</div>
                        <div className="step-item-text">Select Movie</div>
                    </div>
                    <div className={checkIfStepActive(2) ? "step-item step-item-active" : 'step-item'}>
                        <div className="step-item-number">2</div>
                        <div className="step-item-text">Select Showtime</div>
                    </div>
                    <div className={checkIfStepActive(3) ? "step-item step-item-active" : 'step-item'}>
                        <div className="step-item-number">3</div>
                        <div className="step-item-text">Select seat</div>
                    </div>
                    <div className={checkIfStepActive(4) ? "step-item step-item-active" : 'step-item'}>
                        <div className="step-item-number">4</div>
                        <div className="step-item-text">Select food and drink</div>
                    </div>
                    <div className={checkIfStepActive(5) ? "step-item step-item-active" : 'step-item'}>
                        <div className="step-item-number">5</div>
                        <div className="step-item-text">Confirm</div>
                    </div>
                </div>

            </div>
            <div className="btn-container">

                <div className="btn">
                    {currentStep > 1
                        &&
                        <>
                            <i class="fa-solid fa-chevron-left" onClick={handlePrevStep}></i>
                            <p className="btn-text">Back</p>
                        </>

                    }
                </div>
                <div className="message">
                    {checkIfMessageIsShown()
                        &&
                        <p>{message}</p>
                    }
                </div>
                <div className={`${checkIfAbleToNextStep() ? 'btn active' : 'btn'}`}>
                    {currentStep > 0 && checkIfAbleToNextStep()
                        &&
                        <>
                            <i class="fa-solid fa-chevron-right" onClick={handleNextStep}></i>
                            <p className="btn-text">Next</p>
                        </>

                    }
                </div>
            </div>

            {currentStep == 1 &&
                <SelectMovie
                    setSelectedMovie={setSelectedMovie}
                    selectedMovie={selectedMovie}
                />

            }
            {currentStep == 2 &&
                <SelectShowtime
                    selectedMovie={selectedMovie}
                    selectedShowtime={selectedShowtime}
                    setSelectedShowtime={setSelectedShowtime}
                    selectedShowtimeSpot={selectedShowtimeSpot}
                    setSelectedShowtimeSpot={setSelectedShowtimeSpot}
                />
            }

            {currentStep == 3 &&
                <SelectSeat
                    selectedMovie={selectedMovie}
                    selectedShowtime={selectedShowtime}
                    selectedShowtimeSpot={selectedShowtimeSpot}
                    selectedSeats={selectedSeats}
                    setSelectedSeats={setSelectedSeats}
                    selectedTheaterRoom={selectedTheaterRoom}
                    setSelectedTheaterRoom={setSelectedTheaterRoom}
                />
            }

            {currentStep == 4 &&
                <SelectFoodDrink
                    selectedFoods={selectedFoods}
                    selectedDrinks={selectedDrinks}
                    setSelectedDrinks={setSelectedDrinks}
                    setSelectedFoods={setSelectedFoods}
                />
            }
            {
                currentStep == 5 &&
                <ConfirmOrder
                        selectedMovie={selectedMovie}
                        selectedShowtime={selectedShowtime}
                        selectedShowtimeSpot={selectedShowtimeSpot}
                        selectedFoods={selectedFoods}
                        selectedDrinks={selectedDrinks}
                        selectedSeats={selectedSeats}
                        selectedTheaterRoom={selectedTheaterRoom}
                />
            }
        </div>
    )
}
