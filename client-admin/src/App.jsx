import './App.css'
import axios from 'axios'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import Posts from './components/Posts'
import PostDetail from './components/PostDetail'
import { useState } from 'react'
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

function App() {

  const [token, setToken] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setToken(token)
    }
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3000/post')
    .then((res) => {
      console.log(res.data);
      setPosts(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <>
      <Header logged={token}/>
      { token && 
       <>
        <Routes>
          <Route path='/' element={<Posts posts={posts} />} />
          <Route path='/:id' element={<PostDetail posts={posts} setPosts={setPosts} />} />
        </Routes>
      </>  
      }
      {!token && <LoginForm setToken={setToken}/>}
    </>
  )
}

export default App
