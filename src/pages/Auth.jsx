// import { useState } from 'react'
// import SignInForm from '../components/auth/SignInForm'
// import RegisterForm from '../components/auth/RegisterForm'

// export default function Auth() {
//   const [showSignIn, setShowSignIn] = useState(true)

//   return (
//     <main>
//       <h1>Just One More Show</h1>
//       <div>
//         <button onClick={() => setShowSignIn(true)}>Sign In</button>
//         <button onClick={() => setShowSignIn(false)}>Register</button>
//       </div>

//       {showSignIn ? <SignInForm /> : <RegisterForm />}
//     </main>
//   )
// }

import { useState } from 'react'
import SignInForm from '../components/auth/SignInForm'
import RegisterForm from '../components/auth/RegisterForm'

export default function Auth() {
  const [showSignIn, setShowSignIn] = useState(true)

  return (
    <main style={{ textAlign: 'center', padding: '20px' }}>
      {/* <h1>Just One More Show</h1> */}

      {/* Cloudinary Image */}
      <img
        src="https://res.cloudinary.com/dfffu2vb9/image/upload/v1749718860/just-one-more-show.jpg"
        alt="Just One More Show"
        style={{
          maxWidth: '300px',
          width: '100%',
          height: 'auto',
          marginBottom: '20px'
        }}
      />

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowSignIn(true)} style={{ marginRight: '10px' }}>
          Sign In
        </button>
        <button onClick={() => setShowSignIn(false)}>
          Register
        </button>
      </div>

      {showSignIn ? <SignInForm /> : <RegisterForm />}
    </main>
  )
}

