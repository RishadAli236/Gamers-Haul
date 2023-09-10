import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import dashboardImage from '../img/dashboard.jpg'


const Dashboard = (props) => {
    const {loggedInUser, setLoggedInUser} = useContext(UserContext);

    const { gameList, setGameList } = props;

    const navigate = useNavigate();

    useEffect(() => {
            console.log("dashboard effect")
            axios.get("http://localhost:8000/api/user", {withCredentials: true})
                .then(res => {
                    console.log(res.data);
                    setLoggedInUser(res.data)
                })
                .catch(err => {
                    console.log(err)
                    if(err.response.status === 401) navigate("/")
                })
        
            axios.get("http://localhost:8000/api/games", {withCredentials: true})
                .then(res => {
                    console.log(res)
                    setGameList(res.data)
                })
                .catch(err => console.log(err));
            
        }, [])

    

    // const logout = () => {
    //     axios.post("http://localhost:8000/api/logout", {}, {withCredentials: true})
    //         .then(res => {
    //             window.localStorage.removeItem("userId");
    //             navigate("/");
    //     })
    //         .catch(err => console.log(err));
    // }

    return(
        <div style={{backgroundImage: `url(${dashboardImage})`, backgroundSize: "cover"}}>
            <div className="container">
                <div>
                    <h2 className='text-light mb-5 p-3'>Welcome back, {loggedInUser?.username}</h2>
                    <div className='d-flex justify-content-evenly flex-wrap'> 
                        {
                            gameList.map((game, index) => (
                                <div key={index} className="card mb-3" style={{width: "15rem"}}>
                                    <img src={game.image} className="card-img-top" height={150} alt="..."/>
                                    <div className="card-body bg-dark-subtle" >
                                        <p style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}} className="card-text">Title: {game.title}</p>
                                        <p className="card-text">Genre: {game.genre}</p>
                                        <p style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}} className="card-text">Added by: {game.user.username}</p>
                                    </div>
                                    <div className='card-footer'>
                                        <Link to={`/games/${game._id}`}>view</Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                                            {/* {game.title}
                                            <img src={game.image} alt="" width={200} height={200} />
                                        {game.genre}
                                        <Link to={`/games/${game._id}`}>view</Link>
                                        {
                                            loggedInUser?._id == game.user._id?
                                                <td><Link    to={`/games/edit/${game._id}`}>edit</Link></td>:
                                                ""
                                        } */}

                    {/* <button onClick={logout}>Logout</button> */}
                    {/* <Link to={"/games/favorites"}>My favorites</Link> */}
                    
                    
                </div>
            </div>
        </div>
    )
};

export default Dashboard;