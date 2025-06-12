// import { useState } from 'react'
// import SignInForm from '../components/auth/SignInForm'
// import RegisterForm from '../components/auth/RegisterForm'

// export default function Auth() {
//   const [showSignIn, setShowSignIn] = useState(true)

//   return (
//     <main style={{ textAlign: 'center', padding: '20px' }}>
//       {/* <h1>Just One More Show</h1> */}

//       {/* Cloudinary Image */}
//       <img
//         src="https://res.cloudinary.com/dfffu2vb9/image/upload/v1749718860/just-one-more-show.jpg"
//         alt="Just One More Show"
//         style={{
//           maxWidth: '300px',
//           width: '100%',
//           height: 'auto',
//           marginBottom: '20px'
//         }}
//       />

//       <div style={{ marginBottom: '20px' }}>
//         <button onClick={() => setShowSignIn(true)} style={{ marginRight: '10px' }}>
//           Sign In
//         </button>
//         <button onClick={() => setShowSignIn(false)}>
//           Register
//         </button>
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
    <main
      style={{
        textAlign: 'center',
        padding: '40px',
        maxWidth: '400px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      {/* Logo Image */}
      <img
        src="https://res.cloudinary.com/dfffu2vb9/image/upload/v1749718860/just-one-more-show.jpg"
        alt="Just One More Show"
        style={{
          maxWidth: '220px',
          width: '100%',
          height: 'auto',
          marginBottom: '20px'
        }}
      />

      {/* Sign In / Register Toggle Buttons */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setShowSignIn(true)}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            backgroundColor: showSignIn ? '#007bff' : '#f9f9f9',
            color: showSignIn ? '#fff' : '#333',
            cursor: 'pointer'
          }}
        >
          Sign In
        </button>
        <button
          onClick={() => setShowSignIn(false)}
          style={{
            padding: '10px 20px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            backgroundColor: !showSignIn ? '#007bff' : '#f9f9f9',
            color: !showSignIn ? '#fff' : '#333',
            cursor: 'pointer'
          }}
        >
          Register
        </button>
      </div>

      {/* Auth Form */}
      <div style={{ textAlign: 'left', margin: '0 auto', maxWidth: '300px' }}>
        {showSignIn ? <SignInForm /> : <RegisterForm />}
      </div>
    </main>
  )
}

