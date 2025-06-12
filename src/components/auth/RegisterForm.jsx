import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { register, login } from "../../services/auth";
import { setToken, getUserFromToken } from "../../utils/auth";
import { UserContext } from "../../contexts/UserContext";

export default function RegisterForm() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      // 1️⃣ Register user first
      await register(formData);

      // 2️⃣ Login immediately after registration to get tokens
      const loginData = await login({
        username: formData.username,
        password: formData.password,
      });

      // 3️⃣ Save token to localStorage
      setToken(loginData.access);

      // 4️⃣ Set user in context
      setUser(getUserFromToken());

      console.log("User registered & logged in!");
      
      // 5️⃣ Redirect to itineraries page
      navigate('/itineraries');

    } catch (err) {
      console.error(err);
      console.log(err.response?.data); 
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
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Register</button>
    </form>
  );
}




// import { useState, useContext } from "react";
// import { register, login } from "../../services/auth";
// import { setToken, getUserFromToken } from "../../utils/auth";
// import { UserContext } from "../../contexts/UserContext";
// import { useNavigate } from 'react-router'



// export default function RegisterForm() {
//   const { setUser } = useContext(UserContext);
//   const navigate = useNavigate()

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   function handleChange(event) {
//     const { name, value } = event.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   }

//   async function handleSubmit(event) {
//     event.preventDefault();
//     try {
//       // 1️⃣ Register user first
//       await register(formData);

//       // 2️⃣ Login immediately after registration to get tokens
//       const loginData = await login({
//         username: formData.username,
//         password: formData.password,
//       });

//       // 3️⃣ Save token to localStorage
//       setToken(loginData.access);

//       // 4️⃣ Set user in context
//       setUser(getUserFromToken());

//       console.log("User registered & logged in!");
//       navigate('/itineraries')

//     } catch (err) {
//       console.error(err);
//         console.log(err.response?.data); 

//     }
//   }

//   return (
//     <form
//   onSubmit={handleSubmit}
//   style={{
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '10px',
//     alignItems: 'center',
//     marginTop: '15px'
//   }}
// >
//       <input
//         type="text"
//         name="username"
//         value={formData.username}
//         onChange={handleChange}
//         placeholder="Username"
//       />
//       <input
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         name="password"
//         value={formData.password}
//         onChange={handleChange}
//         placeholder="Password"
//       />
//       <button type="submit">Register</button>
//     </form>
//   );
// }


