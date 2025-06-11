import { useNavigate, useLocation } from 'react-router'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { removeToken } from '../../utils/auth'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
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

  const currentValue = (() => {
    if (!user) return '/auth'
    if (location.pathname.startsWith('/itineraries/edit')) return '/itineraries/edit'
    if (location.pathname === '/itineraries') return '/itineraries'
    return '' // fallback
  })()

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <select onChange={handleChange} value={currentValue}>
        <option value="/" disabled>Select Page</option>

        {user ? (
          <>
            <option value="/itineraries">All Itineraries</option>
            <option value="/itineraries/edit">Create / Edit Itinerary</option>
            <option value="logout">Logout</option>
          </>
        ) : (
          <option value="/auth">Login / Register</option>
        )}
      </select>

      {user && <span style={{ marginLeft: '10px' }}>Logged in as: {user.username}</span>}
    </nav>
  )
}

