import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

const Dashboard = (props) => {
    const { gameList, setGameList } = props;

    useEffect(() => {
        axios.get("http://localhost:8000/api/games")
            .then(res => {
                console.log(res)
                setGameList(res.data)
            })
            .catch(err => console.log(err));
    }, [])

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        gameList.map((game, index) => (
                            <tr key={index}>
                                <td>{game.title}</td>
                                <td>{game.genre}</td>
                                <td><Link to={`/games/${game._id}`}>view</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Link to={"/games/new"}>Add a game</Link>
        </div>
    )
};

export default Dashboard;