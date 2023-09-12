import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'

import Dashboard from './components/Dashboard'
import AddGame from './components/AddGame'
import ViewGame from './components/ViewGame'
import Register from './components/Register'
import Login from './components/Login'
import EditGame from './components/EditGame'
import Favorites from './components/Favorites'
import NavBar from './components/NavBar'
import Recommendations from './components/Recommendations'

function App() {
  const [gameList, setGameList] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
      //retrieve API key from .env
      const apiKey = import.meta.env.VITE_API_KEY;
      
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


  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard gameList={gameList} setGameList={setGameList} />} />
        <Route path="/games/new" element={<AddGame  platforms = {platforms} genres = {genres} />} />
        <Route path="/games/:id" element={<ViewGame />} />
        <Route path="/games/edit/:id" element={<EditGame platforms = {platforms} genres = {genres}/>} />
        <Route path="/games/library" element={<Favorites />} />
        <Route path="/games/recommendations" element={<Recommendations  platforms = {platforms} genres = {genres} />} />
      </Routes>
    </>
  )
}

export default App
