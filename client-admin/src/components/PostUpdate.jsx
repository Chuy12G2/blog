import React, { useState } from 'react'
import axios from 'axios'
import { MdOutlineClose } from "react-icons/md"

const PostUpdate = ({ id, currentPost, setShowUpdateForm, setPosts, posts }) => {
  const [title, setTitle] = useState(currentPost.title)
  const [content, setContent] = useState(currentPost.content)

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.put(`http://localhost:3000/post/${id}`, {
      title,
      content
    }).then((res) => {
      console.log(res.data)
      setShowUpdateForm(false)
      setPosts(posts.map(post => post._id === id ? res.data : post))
    }).catch((err) => {
      console.log(err.message)
    })
  }

  const handleCancel = () => {
    setTitle(currentPost.title)
    setContent(currentPost.content)
    setShowUpdateForm(false)
  }

  return (
    <>
      <form className="update-form">
        <MdOutlineClose className="close-btn" onClick={handleCancel}/>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="content">Content</label>
        <textarea
          type="text"
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </>
  )
}

export default PostUpdate
