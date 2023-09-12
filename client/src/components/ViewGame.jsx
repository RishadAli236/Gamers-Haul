import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';

const ViewGame = (props) => {
    const loggedInUserId = window.localStorage.getItem("userId")

    const { id } = useParams();

    const [game, setGame] = useState({})

    const navigate = useNavigate();

    useEffect(() => {
        console.log("viewEffect")
        axios.get(`http://localhost:8000/api/games/${id}`, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setGame(res.data);
            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 401) navigate("/")
            });

    }, [])

    const deleteGame = (id) => {
        axios.delete(`http://localhost:8000/api/games/${id}`, { withCredentials: true })
            .then(res => navigate("/dashboard"))
            .catch(err => console.log(err));
    }

    return (
        <>
            <div style={{ backgroundImage: `url(${game.image})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", height: "100vh", width: "100vw", zIndex: "-1", position: "fixed", filter: "blur(5px) brightness(60%)"}}></div>
            <NavBar/>
            <div className='d-flex align-items-sm-center' style={{height: "85%"}}>
                <div className='container d-flex align-items-sm-center justify-content-center'>
                    <div className="card my-3 w-75" >
                        <div className="row g-0 h-100">
                            <div className="col-md-4">
                                <img src={game.image} className="img-fluid rounded-start h-100" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title mb-3">{game.title}</h5>
                                    <h6 className="card-subtitle mb-3">Genre: {game.genre}</h6>
                                    <h6 className="card-subtitle mb-3">Platform: {game.platform}</h6>
                                    <p className="card-text">{game.user?.username}'s comment: {game.description}</p>
                                    <p className="card-text"><small className="text-body-secondary">Uploaded by {game.user?.username}</small></p>
                                    <div className="card-footer">
                                        {
                                            loggedInUserId == game.user?._id ?
                                                <>
                                                    <button className='me-3 btn btn-danger' onClick={() => deleteGame(game._id)}>Delete</button>
                                                    <Link className='card-link' to={`/games/edit/${game._id}`}>Edit</Link>
                                                </> : ""
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        </>
    )
};

export default ViewGame;