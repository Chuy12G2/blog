import React from 'react'
import axios from 'axios'

const DeletePopup = ({ id, setShowDeletePopup }) => {

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3000/post/${id}`)
      .then((res) => {
        window.location.href = '/'
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
  const handleCancel = () => {
    setShowDeletePopup(false)
  }

  return (
    <div className='delete-popup'>
      <h2>Are you sure you want to delete this post?</h2>
      <div className='delete-popup-buttons'>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default DeletePopup
