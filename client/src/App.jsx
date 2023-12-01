import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Post from './components/Post'
import Posts from './components/Posts'
import PostDetail from './components/PostDetail'
import { Routes, Route } from 'react-router-dom'


function App() {
  const [posts, setPosts] = useState([])

  console.log(posts)
  
  useEffect(() => {
    axios.get('http://localhost:3000/post')
      .then(res => {
        console.log(res.data)
        setPosts(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  return (
    <>
      <Routes>
        <Route path='/' element={<Posts posts={posts} />} />
        <Route path='/:id' element={<PostDetail posts={posts} setPosts={setPosts} />} />
      </Routes>
    </>
  )
}

export default App
