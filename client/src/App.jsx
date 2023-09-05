import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import { Routes, Route } from 'react-router-dom'
import AddGame from './components/AddGame'
import ViewGame from './components/ViewGame'

function App() {
  const [gameList, setGameList] = useState([])

  return (
    <>
    <Routes>
      <Route index element ={<Dashboard gameList = {gameList} setGameList = {setGameList}/>}/>
      <Route path = "/games/new" element ={<AddGame gameList = {gameList} setGameList = {setGameList}/>}/>
      <Route path = "/games/:id" element ={<ViewGame gameList = {gameList} setGameList = {setGameList}/>}/>
    </Routes>
    </>
  )
}

export default App
