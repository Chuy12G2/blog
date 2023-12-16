import React from 'react'

  const Header = ({ logged }) => {

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }  

  return (
    <div className="header">
      <h1>Blog - Admin</h1>
      { logged && <button onClick={handleLogout}>Logout</button>}
    </div>
  )
}

export default Header
