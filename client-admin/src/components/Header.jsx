import React from 'react'
import { Link } from 'react-router-dom'

  const Header = ({ logged }) => {

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }  

  

  return (
    <div className="header">
      <h1>Blog - Admin</h1>
      { logged && (
      <>
        <button onClick={handleLogout}>Logout</button> 
        <Link to={'/create'}>Create New Post</Link>
      </>
     )
     }
    </div>
  )
}

export default Header
