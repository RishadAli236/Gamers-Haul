import React, {useEffect, useState} from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ViewGame = (props) => {
    const loggedInUserId = window.localStorage.getItem("userId")

    const {id} = useParams();

    const [game, setGame] = useState({})

    const navigate = useNavigate();

    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        console.log("viewEffect")
        axios.get(`http://localhost:8000/api/games/${id}`, {withCredentials: true})
            .then(res => {
                console.log(res.data);
                setGame(res.data);
            })
            .catch(err => {
                console.log(err)
                if(err.response.status === 401) navigate("/")
            });

    }, [])

    // const addToLibrary = (id) =>{

    //     axios.put(`http://localhost:8000/api/user/${id}`,{} , {withCredentials: true})
    //         .then( res => {
    //             console.log(res.data);
    //             navigate("/games/library")
    //         })
    //         .catch( err => {
    //             console.log(err);
    //         })

    // }

    const deleteGame = (id) => {
            axios.delete(`http://localhost:8000/api/games/${id}`, {withCredentials: true})
                .then(res => navigate("/dashboard"))
                .catch(err => console.log(err));
    }

    return(
        <>
        <div className="position-relative">
            <div style={{backgroundImage: `url(${game.image})`, backgroundSize: "cover", filter: "blur(5px) brightness(60%)", height: "92vh"}}></div>
            <div className='container position-absolute top-50 start-50 translate-middle'>
                <div  className="card my-3" >
                    <div className="row g-0 h-100">
                        <div className="col-md-4">
                            <img src={game.image} className="img-fluid rounded-start h-100" alt="..."/>
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
                                    loggedInUserId == game.user?._id?
                                    <>
                                        <button className='me-3 btn btn-danger' onClick={() => deleteGame(game._id)}>Delete</button>
                                        <Link className='card-link' to={`/games/edit/${game._id}`}>Edit</Link>
                                    </>:""
                                    // <button onClick={() => addToLibrary(game._id)}>Add to your library</button>
                                }
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
        {/* <h3>{game.title}</h3>
        <h3>{game.genre}</h3>
        <h3>{game.platform}</h3>
        <h3>{game.description}</h3>
        <h3>Added by {game.user?.username}</h3>
        {
            loggedInUserId == game.user?._id?
                <button onClick={() => deleteGame(game._id)}>Delete</button>:
                ""
        } */}
    
        </>

    )
};

export default ViewGame;