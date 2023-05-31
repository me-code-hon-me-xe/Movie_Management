import React, { useState } from 'react';
import './style.scss';
import Seat from '../Seat';
import SeatChart from '../SeatChart';
export default function ({ color, handleAdd, handleCancel, min, max }) {
    const [toRow, setToRow] = useState(min + 1)
    const [price, setPrice] = useState(0)
    const colorStyle = { backgroundColor: color }

    const checkAbleToAdd = () => {
        if (toRow >= min && toRow <= max && price !== '' && price >= 0) {
            return true
        }

        return false
    }

    const handleAddPriceRate = () => {
        console.log(price);
        if (checkAbleToAdd()) {
            handleAdd(min, toRow, price)
        }
    }


    return (
        <div className="AddPriceRate" style={colorStyle}>
            <div className="from">
                <p>From row: </p>
                <input type="number" value={min} />
            </div>
            <div className="to">
                <p>To row: </p>
                <input type="number"
                    min={min + 1}
                    max={max}
                    value={toRow}
                    onChange={(e) => setToRow(e.target.value)}
                />
            </div>

            <div className="price">
                <p>Price $: </p>
                <input type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    onKeyDown={e => {
                        if (e.key == "Enter") {
                            handleAddPriceRate()
                        }
                    }}
                />
            </div>

            <div className="btn-container">
                <div className={`btn add-btn ${checkAbleToAdd() ? '' : 'disabled'}`}
                    onClick={handleAddPriceRate}

                >Add</div>
                <div className="btn cancel-btn" onClick={handleCancel}>Cancel</div>
            </div>

        </div>
    )
}