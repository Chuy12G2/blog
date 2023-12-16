import './App.css'
import LoginForm from './components/LoginForm'
import { useState } from 'react'
import { useEffect } from 'react'

function App() {

  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setToken(token)
    }
  }, [])

  return (
    <>
      <h1>Hi</h1>
      { token && <h1>Posts</h1>}
      {!token && <LoginForm setToken={setToken}/>}
    </>
  )
}

export default App
