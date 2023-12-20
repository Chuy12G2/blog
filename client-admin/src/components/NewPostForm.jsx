import axios from 'axios'
import React, { useState } from 'react'

const NewPostForm = ( ) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:3000/post', {
      title,
      content
    }).then(
      (res) => {
        setTitle('')
        setContent('')
        window.location.href = '/'
      }
    ).catch(
      (err) => {
        console.log(err)
      }
    )

  }

  return (
    <div>
      <form className='new-post-form'>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="content">Content</label>
        <textarea type="text" name="content" id="content" value={content} onChange={(e) => setContent(e.target.value)}/>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default NewPostForm
