import { useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const PostDetail = ({ posts, setPosts }) => {
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')

  const { id } = useParams()
  const currentPost = posts.find(post => post._id === id)

  const updatePost = async (newComment) => {
    await axios.post(`http://localhost:3000/post/${id}/comment`, newComment)
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err.message)
    })

  }
  const handlePostComment = (e) => {
    e.preventDefault()

    const newComment = {
      name: name,
      content: comment
    }

    const updatedPosts = posts.map(post => {
      if (post._id === id) {
        return currentPost
      } else {
        return post
      }
    })

    currentPost.comments.push(newComment)

    setName('')
    setComment('')

    setPosts(updatedPosts)

    updatePost(newComment)
 
  }

  return (
    <div className="post-detail">
      <h1>{currentPost.title}</h1>
      <p>{currentPost.author.name}</p>
      <p>{currentPost.content}</p>
      <h3>{currentPost.comments.length} Comments</h3>
      
      {currentPost.comments.map((comment, index) => (
        <div className='comment' key={index}>
          <p>{comment.name}</p>
          <p>{comment.content}</p>
        </div>
      ))}
      <h3>Leave a comment</h3>
      <form className='form-comment'>
        <label htmlFor="name">Name</label>
        <input className='input-comment' type='text' placeholder='Write your name' id='name' value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="comment">Comment</label>
        <input className='input-comment' type='text' placeholder='Write a comment' id='comment' value={comment} onChange={(e) => setComment(e.target.value)} />
        <button className='btn-comment' type='submit' onClick={handlePostComment}>Comment</button>
      </form>
      </div>
      )
}

      export default PostDetail