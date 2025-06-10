import { Routes, Route, Navigate } from 'react-router'
import Navbar from './components/NavBar/NavBar'
import Auth from './pages/Auth'
import ItineraryIndex from './components/ItineraryIndex/ItineraryIndex'
import ItineraryCreate from './components/ItineraryCreate/ItineraryCreate'
import ItineraryEdit from './components/ItineraryEdit/ItineraryEdit'
import SignOutButton from './components/auth/SignOutButton'

import './App.css'

import { useContext, useEffect } from 'react'
import { UserContext } from './contexts/UserContext'
import { getUserFromToken } from './utils/auth'

function App() {
  const { user, setUser } = useContext(UserContext)

  console.log('App.jsx Current user:', user)

  useEffect(() => {
    const userFromToken = getUserFromToken()
    if (userFromToken) {
      setUser(userFromToken)
    }
  }, [setUser])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/itineraries" />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/itineraries" element={<ItineraryIndex />} />
        <Route path="/itineraries/new" element={<ItineraryCreate />} />
        <Route path="/itineraries/edit" element={<ItineraryEdit />} />
      </Routes>

      {user && <SignOutButton />}
    </>
  )
}

export default App
