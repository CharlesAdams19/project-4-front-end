import { useContext } from "react"
import { removeToken } from "../../utils/auth"
import { UserContext } from "../../contexts/UserContext"

export default function SignOutButton() {
  const { setUser } = useContext(UserContext)

  const handleSignOut = () => {
    removeToken()
    setUser(null)
    console.log("User signed out")
  }

  return <button onClick={handleSignOut}>Sign Out</button>
}
