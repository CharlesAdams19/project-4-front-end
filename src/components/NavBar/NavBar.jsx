import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { removeToken } from '../../utils/auth'

export default function Navbar() {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

  const handleChange = (e) => {
    const path = e.target.value
    if (path === 'logout') {
      removeToken()
      setUser(null)
      navigate('/auth')
    } else {
      navigate(path)
    }
  }

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <select onChange={handleChange} defaultValue="">
        <option value="" disabled>Select Page</option>
        <option value="/">Home</option>
        <option value="/itineraries">All Itineraries</option>
        <option value="/itineraries/new">Create Itinerary</option>
        <option value="/auth">{user ? 'Switch User' : 'Login/Register'}</option>
        <option value="/itineraries/edit">Edit Itinerary</option>
        {user && <option value="logout">Logout</option>}
      </select>
      {user && <span style={{ marginLeft: '10px' }}>Logged in as: {user.username}</span>}
    </nav>
  )
}
