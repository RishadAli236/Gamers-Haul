import { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard'
import { Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'

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

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("UseEffect was run");
  //   axios.post("http://localhost:8000/api/tokenIsValid", {}, {withCredentials: true})
  //     .then(res => console.log(res))
  //     .catch(err => {
  //       console.log(err);
  //       navigate("/");
  //     })
  // }, []);

  return (
    <>
    <Routes>
      <Route index element ={<Login/>}/>
      <Route path = "/register" element ={<Register/>}/>
      <Route element ={<NavBar/>}>
        <Route path = "/dashboard" element ={<Dashboard gameList = {gameList} setGameList = {setGameList}/>}/>
        <Route path = "/games/new" element ={<AddGame/>}/>
        <Route path = "/games/:id" element ={<ViewGame/>}/>
        <Route path = "/games/edit/:id" element ={<EditGame/>}/>
        <Route path = "/games/library" element ={<Favorites/>}/>
        <Route path = "/games/recommendations" element ={<Recommendations/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
