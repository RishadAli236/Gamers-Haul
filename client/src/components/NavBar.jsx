import axios from 'axios';
import React, {useState} from 'react';
import { Link, Outlet, useNavigate} from 'react-router-dom';

const NavBar = (props) => {

    const navigate = useNavigate();

    const logout = () => {
        axios.post("http://localhost:8000/api/logout", {}, {withCredentials: true})
            .then(res => {
                window.localStorage.removeItem("userId");
                navigate("/");
        })
            .catch(err => console.log(err));
    }

    return(
        <div>
            <nav className="navbar bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand text-light" href="#">Gamers Haul</a>
                    <ul className="nav justify-content-end">
                        <li className="nav-item">
                            <Link className="nav-link text-warning" to={"/dashboard"}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-warning" to={"/games/new"}>Add a game</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-warning" to={"/games/recommendations"}>Recommendations</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-warning" to={"/games/library"}>My Library</Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link text-warning" onClick={logout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet/>
        </div>
    )
};

export default NavBar;