import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ViewGame = ({gameList, setGameList}) => {
    const {id} = useParams();

    const [game, setGame] = useState({})

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/games/${id}`)
            .then(res => setGame(res.data))
            .catch(err => console.log(err));
    }, [])

    const deleteGame = (id) => {

            axios.delete(`http://localhost:8000/api/games/${id}`)
                .then(res => navigate("/"))
                .catch(err => console.log(err));
    }

    return(
        <div>
            <h3>{game.title}</h3>
            <h3>{game.genre}</h3>
            <h3>{game.platform}</h3>
            <h3>{game.description}</h3>
            <button onClick={() => deleteGame(game._id)}>Delete</button>
        </div>
    )
};

export default ViewGame;