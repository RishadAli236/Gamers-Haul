import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import libraryImage from '../img/library.jpg'
import NavBar from './NavBar';

const Favorites = (props) => {
    const [favorites, setFavorites] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        //authenticate user on rendering this route
        axios.post("http://localhost:8000/api/tokenIsValid", {}, { withCredentials: true })
            .then(res => console.log("User is verified"))
            .catch(err => {
                console.log("User not verified");
                navigate("/");
            })

        axios.get("http://localhost:8000/api/user", { withCredentials: true })
            .then(res => {
                console.log(res.data.favorites);
                setFavorites(res.data.favorites)
            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 401) navigate("/")
            })
    }, [])

    const deleteGame = (id) => {
        axios.delete(`http://localhost:8000/api/games/${id}`, { withCredentials: true })
            .then(res => navigate("/dashboard"))
            .catch(err => console.log(err));
    }

    return (
        <>
            <div style={{ backgroundImage: `url(${libraryImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", height: "100vh", width: "100vw", zIndex: "-1", position: "fixed"}}></div>
            <NavBar/>
            <div className="container mx-auto pt-4">
                <h3 className='text-white mb-5 p-3'>Your Collection, your journey</h3>
                <div className='d-flex justify-content-evenly flex-wrap'>
                    {
                        favorites.map((game, index) => (
                            <div key={index} className="card mb-3" style={{ width: "15rem" }}>
                                <img src={game.image} className="card-img-top" height={150} alt="..." />
                                <div className="card-body bg-dark-subtle" >
                                    <p style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} className="card-text">Title: {game.title}</p>
                                    <p className="card-text">Genre: {game.genre}</p>
                                </div>
                                <div className='card-footer bg-dark-subtle'>
                                    <Link className='card-link' to={`/games/edit/${game._id}`}>Edit</Link>
                                    <button className='ms-5 btn btn-danger' onClick={() => deleteGame(game._id)}>Delete</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
};

export default Favorites;