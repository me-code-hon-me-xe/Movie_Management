import './style.scss';
import Movie from '../../../../components/Movie';

import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../../../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ({ selectedMovie, setSelectedMovie }) {
    const [movies, setMovies] = useState([]);
    const { jwtToken } = useContext(UserContext)

    useEffect(() => {
        fetchMovies();
    }, [])

    const fetchMovies = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        };
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/movies`, config);
        if (response.data.success) {
            setMovies(response.data.data)
        }
    }
    const navigate = useNavigate()

    const handleClickMovie = (movie) => {
        setSelectedMovie(movie)
    }

    const checkIfBlur = (movie) => {
        if (selectedMovie !== undefined && selectedMovie._id !== movie._id) {
            return true;
        } else {
            return false;
        }
    }


    return (
        <div className="step-1">
            <div className="movie-container">
                {movies.map((movie, index) => {
                    return (
                        <Movie
                            posterLink={movie.poster}
                            movieTitle={movie.title}
                            releaseDate={movie.releaseDate}
                            isActive={movie._id == selectedMovie?._id}
                            onClick={() => handleClickMovie(movie)}
                            blur={checkIfBlur(index)}
                        />
                    )
                })}

            </div>
        </div>
    )
}