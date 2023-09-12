import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';


const EditGame = (props) => {
    const { id } = useParams();

    /*Important note: when make a get one request, a full document is returne i.e contains all fields including
    _id, created_at and updated_at so if you are using the same document in state for editing remember not to 
    send it back to the server as it is because it will contain the _id and this will cause problems when you are trying to do unique validation */

    const [game, setGame] = useState({ title: "", genre: "", platform: "", description: "", image: "" });
    const [genres, setGenres] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [errors, setErrors] = useState({});

    const apiKey = import.meta.env.VITE_API_KEY;

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/games/${id}`, { withCredentials: true })
            .then(res => {
                setGame(res.data);
            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 401) navigate("/")
            })

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

        //Double check the contents of the payload and make sure only what is needed is passed
        axios.put(`http://localhost:8000/api/games/${id}`, { title: game.title, genre: game.genre, platform: game.platform, description: game.description, image: game.image }, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                navigate("/dashboard")
            })
            .catch(err => {
                console.log(err);
                setErrors(err.response.data.errors);
            })
    }

    return (
        <>
            <div style={{ backgroundImage: `url(${game.image})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", height: "100vh", width: "100vw", zIndex: "-1", position: "fixed", filter: "blur(5px) brightness(60%)"}}></div>
            <NavBar/>
            <div className='container position-absolute top-50 start-50 translate-middle'>
                <h3 className='p-4 text-warning'>Level up your game info!</h3>
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

                        <div className='row'>
                            <div className='col'>
                                <input className='form-control-sm btn bg-primary text-light' type="submit" value="Update" />
                            </div>
                            <div className='col'>
                                <Link to={"/dashboard"} className='btn btn-secondary text-warning'>Cancel</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default EditGame;