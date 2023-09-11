import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import addImage from '../img/add.jpg'


const AddGame = (props) => {
    const [game, setGame] = useState({ title: "", genre: "", platform: "", description: "", image: "" });
    const [genres, setGenres] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [errors, setErrors] = useState({});

    //retrieve API key from .env
    const apiKey = import.meta.env.VITE_API_KEY;

    const navigate = useNavigate();

    useEffect(() => {
        //authenticate user on rendering this route
        axios.post("http://localhost:8000/api/tokenIsValid", {}, { withCredentials: true })
            .then(res => console.log("User is verified"))
            .catch(err => {
                console.log("User not verified");
                navigate("/");
            })

        //make request to external API for list of video game platforms
        axios.get(`https://api.rawg.io/api/platforms?key=${apiKey}`)
            .then(res => {
                console.log(res);
                setPlatforms(res.data.results)
            })
            .catch(err => console.log(err));

        //make request to external API for list of video game genres
        axios.get(`https://api.rawg.io/api/genres?key=${apiKey}`)
            .then(res => {
                console.log(res);
                setGenres(res.data.results)
            })
            .catch(err => console.log(err));
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/games", game, { withCredentials: true })
            .then(res => navigate("/dashboard"))
            .catch(err => {
                console.log(err);
                setErrors(err.response.data.errors);
            })
    }

    return (
        <div style={{ backgroundImage: `url(${addImage})`, backgroundSize: "cover", height: "100vh" }}>
            <div className="container">
                <h3 className='p-4 text-warning'>Let's add to the trove</h3>
                <div>
                    <form className='w-50 h-50 pt-3' onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <input className='form-control' type="text" name="title" value={game.title} placeholder='Title' onChange={(e) => setGame({ ...game, title: e.target.value })} />
                            {
                                errors.title ?
                                    <p className='form-text text-warning'>{errors.title.message}</p> :
                                    ""
                            }
                        </div>

                        <div className='mb-3'>
                            <select className='form-select' name="genre" value={game.genre} onChange={(e) => setGame({ ...game, genre: e.target.value })}>
                                <option className='bg-secondary text-light' value="">Genre</option>
                                {
                                    genres.map((genre, index) => (
                                        <option className='bg-secondary text-light' key={index} value={genre.name}>{genre.name}</option>
                                    ))
                                }
                            </select>
                            {
                                errors.genre ?
                                    <p className='form-text text-warning'>{errors.genre.message}</p> :
                                    ""
                            }
                        </div>

                        <div className='mb-3'>
                            <select className='form-select' name="platform" value={game.platform} onChange={(e) => setGame({ ...game, platform: e.target.value })}>
                                <option className='bg-secondary text-light' value="">Platform</option>
                                {
                                    platforms.map((platform, index) => (
                                        <option className='bg-secondary text-light' key={index} value={platform.name}>{platform.name}</option>
                                    ))
                                }
                            </select>
                            {
                                errors.platform ?
                                    <p className='form-text text-warning'>{errors.platform.message}</p> :
                                    ""
                            }
                        </div>

                        <div className="mb-3">
                            <textarea className='form-control' name="description" value={game.description} placeholder='Your thoughts about the game...' onChange={(e) => setGame({ ...game, description: e.target.value })}></textarea>
                            {
                                errors.description ?
                                    <p className='form-text text-warning'>{errors.description.message}</p> :
                                    ""
                            }
                        </div>

                        <div className="mb-3">
                            <input className='form-control' type="text" name="image" value={game.image} placeholder='Add an image URL' onChange={(e) => setGame({ ...game, image: e.target.value })} />
                            {
                                errors.image ?
                                    <p className='form-text text-warning'>{errors.image.message}</p> :
                                    ""
                            }
                        </div>

                        <div>
                            <input className='form-control-sm bg-primary text-light' type="submit" value="Add Game" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default AddGame;