import { useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import '../App.css'
import { MdOutlineInsertComment } from "react-icons/md"
import { MdModeEdit, MdDelete } from "react-icons/md";
import PostUpdate from './PostUpdate'
import DeletePopup from './DeletePopup'

const PostDetail = ({ posts, setPosts }) => {
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [showDeletePopup, setShowDeletePopup] = useState(false)

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

  const handleShowForm = () => {
    setShowUpdateForm(!showUpdateForm)
  }

  const handleShowDeletePopup = () => {
    setShowDeletePopup(!showDeletePopup)
  }

  return (
    <div className="post-detail">
      <header className='post-header'>
        <h1>{currentPost.title}</h1>
        <MdModeEdit onClick={handleShowForm}/>
        <MdDelete onClick={handleShowDeletePopup}/>
      </header>
      <p>{currentPost.author.name}</p>
      <p>{currentPost.content}</p>
      <div className='post-number-comments'>
        <MdOutlineInsertComment />
        <h3>{currentPost.comments.length} Comments</h3>
      </div>

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

      {showUpdateForm && <PostUpdate id={id} posts={posts} setPosts={setPosts} currentPost={currentPost} setShowUpdateForm={setShowUpdateForm}/>}
      {showDeletePopup && <DeletePopup id={id} setShowDeletePopup={setShowDeletePopup}/>}
    </div>
  
    
  )
}

export default PostDetail