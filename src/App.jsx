import { Routes, Route } from 'react-router'
import Navbar from './components/NavBar/NavBar'
import Auth from './pages/Auth'
import ItineraryIndex from './components/ItineraryIndex/ItineraryIndex'
import ItineraryCreate from './components/ItineraryCreate/ItineraryCreate'
import { Navigate } from 'react-router'

// import MovieShow from './components/MovieShow/MovieShow'
// import Profile from './components/Profile/Profile'

import './App.css'
import SignOutButton from './components/auth/SignOutButton'
import ItineraryEdit from './components/ItineraryEdit/ItineraryEdit'


import { useContext } from 'react'
import { UserContext } from './contexts/UserContext'


function App(){
const { user } = useContext(UserContext)


  return (
        <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/itineraries" />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/itineraries" element={<ItineraryIndex />} />
        <Route path="/itineraries/new" element={<ItineraryCreate />} />
        <Route path="/itineraries/:itineraryId/edit" element={<ItineraryEdit />} />

        
        { user && <SignOutButton /> }

      </Routes>
    </>
  )
}

export default App