import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

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

  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard gameList={gameList} setGameList={setGameList} />} />
        <Route path="/games/new" element={<AddGame />} />
        <Route path="/games/:id" element={<ViewGame />} />
        <Route path="/games/edit/:id" element={<EditGame />} />
        <Route path="/games/library" element={<Favorites />} />
        <Route path="/games/recommendations" element={<Recommendations />} />
      </Routes>
    </>
  )
}

export default App
