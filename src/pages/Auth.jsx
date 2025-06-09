import { useState } from 'react'
import SignInForm from '../components/auth/SignInForm'
import RegisterForm from '../components/auth/RegisterForm'

export default function Auth() {
  const [showSignIn, setShowSignIn] = useState(true)

  return (
    <main>
      <h1>Welcome to Just One More Show</h1>
      <div>
        <button onClick={() => setShowSignIn(true)}>Sign In</button>
        <button onClick={() => setShowSignIn(false)}>Register</button>
      </div>

      {showSignIn ? <SignInForm /> : <RegisterForm />}
    </main>
  )
}
