import React, { useContext } from 'react'
import UserContext from '../context/UserContext';

function Login()
{
const[username,setUsername] = React.useState('');
const[password,setPassword] = React.useState('')

const{setUser} = useContext(UserContext)

const submitHandler = (e) => {
  e.preventDefault()
    setUser({username,password})
}
  return (
    <div>
        <h2>Login here</h2>
        <input
         type='text'
          placeholder='username' 
          value={username} 
            onChange={(e)=>setUsername(e.target.value)}
        />
        {"  "}
         <input type='password' placeholder='password' value={password}
         onChange={(e)=>setPassword(e.target.value)} />

         <button onClick={submitHandler}>
            Submit
         </button>
    </div>
  )
}

export default Login