import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../../context/UserContext';

import './style.scss';
import Movie from '../../../components/Movie';
import { useNavigate } from 'react-router-dom';
import AddMovieBtn from '../../../components/AddMovieBtn';
import axios from 'axios';

export default function () {
    const [movies, setMovies] = useState([]);

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
    const { jwtToken } = useContext(UserContext)

    const handleClick = () => {
        navigate("/add-movie")
    }

    return (
        <div className='MovieViewAllPage'>
            <div className="movie-container">
                <AddMovieBtn />
                {movies.map((movie, index) => {
                    return (
                        <Movie
                            posterLink={movie.poster}
                            movieTitle={movie.title}
                            releaseDate={movie.releaseDate}
                            onClick={() => navigate(`/movies/${movie._id}`)}
                        />
                    )
                }
                )}
            </div>


        </div>
    )
}