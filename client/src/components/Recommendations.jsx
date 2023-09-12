import React, { useEffect, useState } from 'react';
import axios from 'axios';
import recommendationsImage from '../img/recommendations.jpg'
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const Recommendations = (props) => {

    const [genres, setGenres] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [preferences, setPreferences] = useState({ genre: "", platform: "" });
    const [recommendations, setRecommendations] = useState([]);

    const navigate = useNavigate();

    const apiKey = import.meta.env.VITE_API_KEY;

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
                console.log("platform list", res);
                setPlatforms(res.data.results)
            })
            .catch(err => console.log(err));

        //make request to external API for list of video game genres
        axios.get(`https://api.rawg.io/api/genres?key=${apiKey}`)
            .then(res => {
                console.log("genre list", res);
                setGenres(res.data.results)
            })
            .catch(err => console.log(err));

        //make request to external API for list of games sorted by rating
        axios.get(`https://api.rawg.io/api/games?key=${apiKey}&ordering=-rating&page_size=10`)
            .then(res => {
                console.log("recommendations", res);
                setRecommendations(res.data.results)
            })
            .catch(err => console.log(err));

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        //make request to external API for list of video games with the platform and genre as query parameters
        axios.get(`https://api.rawg.io/api/games?key=${apiKey}&platforms=${preferences.platform}&genres=${preferences.genre}&ordering=-rating&page_size=10`)
            .then(res => {
                console.log("recommendations", res);
                setRecommendations(res.data.results)
            })
            .catch(err => console.log(err));
    }
    return (
        <>
            <NavBar/>
            <div style={{ backgroundImage: `url(${recommendationsImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", height: "100vh", width: "100vw", zIndex: "-1", position: "fixed"}}></div>
            <div className='container'>
                <h3 className='text-warning pt-4'>Recommendations</h3>
                <form className='w-750 h-50 pt-3 row' onSubmit={handleSubmit}>
                    <div className='mb-3 col'>
                        <select className='form-select' name="genre" value={preferences.genre} onChange={(e) => setPreferences({ ...preferences, genre: e.target.value })}>
                            <option className='bg-secondary text-light' value="">Choose a genre</option>
                            {
                                genres.map((genre, index) => (
                                    <option className='bg-secondary text-light' key={index} value={genre.id}>{genre.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="mb-3 col">
                        <select className='form-select' name="platform" value={preferences.platform} onChange={(e) => setPreferences({ ...preferences, platform: e.target.value })}>
                            <option className='bg-secondary text-light' value="">Choose a platform</option>
                            {
                                platforms.map((platform, index) => (
                                    <option className='bg-secondary text-light' key={index} value={platform.id}>{platform.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className='col'>
                        <input className='form-control-sm bg-primary text-light' type="submit" value="Filter" />
                    </div>
                </form>
                <div className='d-flex justify-content-evenly flex-wrap'>
                    {
                        recommendations.map((recommendation, index) => (
                            <div key={index} className="card mb-3" style={{ width: "15rem" }}>
                                <img src={recommendation.background_image} className="card-img-top" height={150} alt="..." />
                                <div className="card-body bg-dark-subtle" >
                                    <p style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} className="card-text">Title: {recommendation.name}</p>
                                    <p className="card-text">Genre: {recommendation.genres[0]?.name}</p>
                                    <p style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} className="card-text">Platform: {recommendation.platforms[0].platform.name}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
};

export default Recommendations;