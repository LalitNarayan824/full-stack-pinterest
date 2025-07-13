import React from 'react'
import './TopBar.css'
import UserButton from '../userButton/UserButton'
import ImageElement from '../image/Image'
import { useNavigate } from 'react-router'

const TopBar = () => {
  

  const navigate = useNavigate();
  const handleSubmit = (e)=>{
    e.preventDefault();

    navigate(`/search?search=${e.target[0].value}`)

  }

  return (
    <div className='topBar'>
      <form className="search" onSubmit={handleSubmit}>
        <ImageElement  path="general/search.svg" alt="search" />
        <input type="text" placeholder='Search' />
      </form>
      <UserButton/>
      
    </div>
  )
}

export default TopBar
