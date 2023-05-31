import React from 'react';
import './style.scss';

import MovieDetail from '../../../../components/MovieDetail';
import MovieShowtimeDetails from '../../../../components/MovieShowtimeDetails';
export default function ({selectedMovie, selectedShowtime, setSelectedShowtime, selectedShowtimeSpot, setSelectedShowtimeSpot }) {




    const handleClickShowtimeDate = (showtime) => {
        //selectedShowtime can be undefined in the beginning
        if (selectedShowtime?.date !== showtime.date) {
            setSelectedShowtime(showtime);

            if (selectedShowtimeSpot) {
                if (!showtime.spots.includes(selectedShowtimeSpot)) {
                    setSelectedShowtimeSpot(undefined);
                }
            }
        } else {
            // unselect the item when it is clicked twice
            setSelectedShowtime(undefined);
        }
    }

    const handleClickShowtimeSpot = (spot) => {
        if (selectedShowtimeSpot !== spot) {
            setSelectedShowtimeSpot(spot);
        } else {
            // unselect the item when it is clicked twice
            setSelectedShowtimeSpot(undefined);
        }
    }
    return (
        <div className="step-2">
            <div className="movie-detail">
                <MovieDetail
                    displayLargePoster={false}
                    movieId={selectedMovie._id}
                />

                <MovieShowtimeDetails 
                    movieId={selectedMovie._id}
                    selectedShowtime={selectedShowtime}
                    selectedShowtimeSpot={selectedShowtimeSpot}
                    handleClickShowtimeDate={handleClickShowtimeDate}
                    handleClickShowtimeSpot={handleClickShowtimeSpot}
                />

            </div>
        </div>
    )
}