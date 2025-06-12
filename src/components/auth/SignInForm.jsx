import { useState, useContext } from 'react'
import { useNavigate } from 'react-router' 
import { login } from '../../services/auth'
import { setToken, getUserFromToken } from '../../utils/auth'
import { UserContext } from '../../contexts/UserContext'

export default function SignInForm() {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const  data  = await login(formData)
      setToken(data.access, data.refresh)
      setUser(getUserFromToken())
      console.log('User signed in')
      navigate('/itineraries')   

    } catch (err) {
      console.error(err.response ? err.response.data : err)
    }
  }

  return (
    <form
  onSubmit={handleSubmit}
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
    marginTop: '15px'
  }}
>
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">Sign In</button>
    </form>
  )
}
