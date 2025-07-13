import React, { useState } from 'react'
import './userButton.css'
import ImageElement from '../image/Image'
import apiRequest from '../../utils/apiRequest'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import useAuthStore from '../../utils/authStore'

const UserButton = () => {

  const navigate = useNavigate()

  const [open , setOpen] = useState(false)
  // temporary user
  const {currentUser, removeCurrentUser} = useAuthStore();
  // console.log(currentUser)

  const handleLogout = async ()=>{
    const res = apiRequest.post('/api/users/auth/logout', {});
    // navigate('/auth');
    removeCurrentUser();
    // console.log(currentUser)
  }

  

  return currentUser ? (
    <div className='userButtons'>
      <a  ><ImageElement path={currentUser?.img || "/general/noAvatar.png"} alt="noavatar" /></a>
      <a onClick={e => { e.preventDefault(); setOpen(prev => !prev); }}  href="/"><ImageElement path="general/arrow.svg" alt="arrow" className='arrow'/></a>
      {open && <div className='userOptions'>
        <Link to={`/${currentUser.username} `} className="userOption">Profile</Link>
        <div className="userOption">Settings</div>
        <div onClick={handleLogout} className="userOption">Logout</div>
      </div>}
    </div>

  ):(
    <Link to={'/auth'} className='loginLink'>
      Login / Sign up
    </Link>
  )


}

export default UserButton
