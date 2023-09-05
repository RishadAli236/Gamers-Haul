import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddGame = (props) => {
    const [game, setGame] = useState({ title : "", genre : "", platform : "", description : ""})

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/games", game)
            .then( res => navigate("/"))
            .catch( err => console.log(err))
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" value={game.title} onChange={(e) => setGame({...game, title: e.target.value})} />

                <label htmlFor="genre">Genre</label>
                <input type="text" name="genre" value={game.genre} onChange={(e) => setGame({...game, genre: e.target.value})}/>

                <label htmlFor="platfrom">Platform</label>
                <input type="text" name="platform" value={game.platform} onChange={(e) => setGame({...game, platform: e.target.value})}/>

                <label htmlFor="">Description</label>
                <textarea name="description" id="" cols="30" rows="10" value={game.description} onChange={(e) => setGame({...game, description: e.target.value})}></textarea>

                <input type="submit" value="Add" />
            </form>
        </div>
    )
};

export default AddGame;