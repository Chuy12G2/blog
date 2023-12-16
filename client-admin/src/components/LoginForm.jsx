import { useState } from "react"
import axios from 'axios'
import '../App.css'

const LoginForm = ({ setToken }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      console.log('Missing email or password')
    }

    axios.post('http://localhost:3000/auth/login', {
      email, 
      password
    }).then((res) => {
      console.log(res.data)
      setToken(res.data.token)
      localStorage.setItem('token', res.data.token)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <form className="login-form">
        <label htmlFor="email">Username</label>
        <input type="text" id="email" name="email" onChange={e => setEmail(e.target.value)} value={email}/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" onChange={e => setPassword(e.target.value)} value={password}/>
        <button type="submit" onClick={handleSubmit}>Login</button>
      </form>
    </>
  )
}

export default LoginForm