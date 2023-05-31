import React, { useContext, useState } from 'react';
import UserContext from '../../../context/UserContext';

import './style.scss';
import { useRef } from 'react';
import Genre from '../../../components/Genre';
import PersonName from '../../../components/PersonName';
import axios from 'axios';
import { uploadFileToCloudinary } from '../../../utils/utils';

export default function () {
    const { user, setUser, jwtToken, setJwtToken } = useContext(UserContext)

    const [isDragOver, setIsDragOver] = useState(false);
    const [file, setFile] = useState();


    const [genres, setGenres] = useState([])
    const [actors, setActors] = useState([])
    const [directors, setDirectors] = useState([])

    const [genreInput, setGenreInput] = useState()
    const [actorInput, setActorInput] = useState()
    const [directorInput, setDirectorInput] = useState()
    const [movieTitleInput, setMovieTitleInput] = useState()
    const [releaseDateInput, setReleaseDateInput] = useState()
    const [durationInput, setDurationInput] = useState()
    const [countryInput, setCountryInput] = useState()
    const [descriptionInput, setDescriptionInput] = useState()

    const fileInputRef = useRef(null);


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

    const handleAddGenre = () => {
        if (genreInput.trim()) {
            setGenres([...genres, genreInput])
            setGenreInput('')
        }
    }

    const handleAddActor = () => {
        if (actorInput.trim()) {
            setActors([...actors, actorInput])
            setActorInput('')
        }
    }

    const handleAddDirector = () => {
        if (directorInput.trim()) {
            setDirectors([...directors, directorInput])
            setDirectorInput('')
        }
    }



    const handleSave = async () => {
        //TODO: tas
        let poster = null;
        if (file) {
            poster = await uploadFileToCloudinary(file)
        }


        const body = {
            title: movieTitleInput,
            description: descriptionInput,
            releaseDate: releaseDateInput,
            duration: durationInput,
            country: countryInput,
            genre: genres,
            actors: actors,
            directors: directors,
            poster: poster
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        };
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/admin/movies`, body,  config);
        console.log(response);
    }

    return (
        <div className='MovieCreatePage'>
            <h1 className='add-movie-text'>Add Movie</h1>
            <div className="page-content">
                <div className="left">
                    <div className="movie-title">
                        <p className="item-text">Movie Title</p>
                        <input className='title' type="text"
                            placeholder='Enter movie title'
                            value={movieTitleInput}
                            onChange={(e) => setMovieTitleInput(e.target.value)}
                        />
                    </div>

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
                                        ref={fileInputRef}
                                        onChange={handleChooseFile}
                                    />

                                </label>
                            </div>
                            :
                            <div
                                className={`poster ${isDragOver ? 'drag-over' : ''}`}
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
                                        ref={fileInputRef}
                                        onChange={handleChooseFile}
                                    />
                                </label>
                                <p>Drag and drop the movie poster here</p>

                            </div>
                    }




                </div>
                <div className="right">

                    <div className="item-container">
                        <div className="item genre">
                            <p className="item-text">Genre: </p>
                            <input type="text"
                                placeholder='Enter genre'
                                value={genreInput}
                                onChange={(e) => setGenreInput(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        handleAddGenre()
                                    }
                                }}
                            />
                            <p className='add-btn' onClick={handleAddGenre}><i class="fa-solid fa-plus"></i></p>
                        </div>
                        <div className="genre-container">
                            {genres.map(genre => <Genre genre={genre} />)}

                        </div>

                        <div className="item release-date">
                            <p className="item-text">Release Date: </p>
                            <input type="date"
                                value={releaseDateInput}
                                onChange={(e) => setReleaseDateInput(e.target.value)}
                            />
                        </div>

                        <div className="item duration">
                            <p className="item-text">Duration: </p>
                            <input type="number"
                                placeholder='Enter duration (minutes)'
                                value={durationInput}
                                onChange={(e) => setDurationInput(e.target.value)}
                            />
                        </div>


                        <div className="item country">
                            <p className="item-text">Country: </p>
                            <input type="text"
                                placeholder='Enter country'
                                value={countryInput}
                                onChange={(e) => setCountryInput(e.target.value)}
                            />
                        </div>

                        <div className="item description">
                            <p className="item-text">Description: </p>
                            <textarea value={descriptionInput}
                                onChange={(e) => setDescriptionInput(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="item actor">
                            <p className="item-text">Actor: </p>
                            <input type="text"
                                placeholder='Enter actor'
                                value={actorInput}
                                onChange={(e) => setActorInput(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        handleAddActor()
                                    }
                                }}
                            />
                            <p className='add-btn' onClick={handleAddActor}><i class="fa-solid fa-plus"></i></p>
                        </div>
                        <div className="actor-container">
                            {actors.map(actor => <PersonName name={actor} />)}
                        </div>

                        <div className="item director">
                            <p className="item-text">Director: </p>
                            <input type="text"
                                placeholder='Enter director'
                                value={directorInput}
                                onChange={(e) => setDirectorInput(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        handleAddDirector()
                                    }
                                }}
                            />
                            <p className='add-btn' onClick={handleAddDirector}><i class="fa-solid fa-plus"></i></p>
                        </div>
                        <div className="director-container">
                            {directors.map(actor => <PersonName name={actor} />)}
                        </div>
                    </div>


                </div>
            </div>

            <div className="btn-container">
                <p className="gradient-btn save-btn" onClick={handleSave}>Save</p>

            </div>
        </div>
    )
}