import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../context/UserContext'

import './style.scss';
import Genre from '../Genre';
import PersonName from '../PersonName';
import axios from 'axios';
import { formatDate } from '../../utils/utils';

export default function ({ movieId, displayLargePoster }) {
    const style = displayLargePoster ? '' : 'display-small-poster' // because this component is used in two places, we need to be able to control the size of the poster
    // const movie = {
    //     title: 'The Avengers',
    //     posterLink: 'https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
    //     releaseDate: 'April 2012',
    //     description: '“The Avengers” is a 2012 superhero film that brings together some of Marvel’s most iconic heroes to save the world from the villainous Loki and his alien army. The movie follows Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., as he assembles a team of superheroes to stop Loki’s plan to enslave humanity. The team includes Iron Man, Captain America, Thor, and the Hulk, as well as Black Widow and Hawkeye. Throughout the movie, the team must learn to work together and overcome their differences to stop Loki’s plan. Along the way, they face challenges and obstacles as they try to save the world. The movie is filled with action-packed scenes and stunning visual effects that will keep audiences on the edge of their seats. One of the strengths of “The Avengers” is its ability to balance multiple actors and storylines while keeping things coherent and entertaining. Each character is given their moment to shine, and the interactions between them are a highlight of the movie. Overall, “The Avengers” is an exciting and thrilling adventure that will delight audiences of all ages.',
    //     genres: ['Science Fiction', 'Action', 'Adventure'],
    //     actors: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo', 'Chris Hemsworth', 'Scarlett Johansson', 'Jeremy Renner'],
    //     director: ['Joss Whedon'],
    //     duration: 142,
    //     country: "United States"
    // }
    const { jwtToken } = useContext(UserContext)

    const [movie, setMovie] = useState(null)
    useEffect(() => {
        fetchMovie()
    }, [])

    const fetchMovie = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        };
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/movies/${movieId}`, config);
        if (response.data.success) {
            setMovie(response.data.data)
        }
    }

    function formatDuration(duration) {
        const hours = Math.floor(duration / 60)
        const minutes = duration % 60
        if (hours == 0) return `${minutes}m`
        return `${hours}h ${minutes}m`
    }

    if (!movie) {
        return
    }
    return (
        <div className={`MovieDetail  ${style}`}>
            <div className="heading">
                <div className="row-1">
                    <p className="title">{movie.title}</p>
                </div>
                <div className="row-2">
                    <p className="release-date">{formatDate(movie.releaseDate)}</p>
                    <p className="duration">{formatDuration(movie.duration)}</p>
                    <p className="country">{movie.country}</p>
                </div>
            </div>


            <div className='movie-info'>
                <div className="poster">
                    <img src={movie.poster} alt="" />
                </div>
                <div className="info">
                    <div className="genre-container">
                        {movie.genre.map(genre => <Genre genre={genre} />)}
                    </div>
                    <p className="description">{movie.description}</p>

                    {movie.actors?.length > 0 &&
                        <>
                            <h1 className='bold'>Actors: </h1>
                            <div className="actor-container">
                                {movie.actors.map(name => <PersonName name={name} />)}
                            </div>
                        </>
                    }

                    {movie.directors?.length > 0 &&
                        <>
                            <h1 className='bold'>Director: </h1>
                            <div className="director-container">
                                {movie.directors.map(name => <PersonName name={name} />)}
                            </div>
                        </>
                    }
                    
                </div>
            </div>

        </div>
    )
}