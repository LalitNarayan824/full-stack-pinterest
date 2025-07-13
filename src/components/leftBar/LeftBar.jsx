import React from 'react'
import './leftBar.css'
import ImageElement from '../image/Image'
import {Link} from 'react-router'

const LeftBar = () => {
  return (
    <div className='leftBar'>
      <div className="menuIcons">
        <Link to="/" className='menuIcon'>
          <ImageElement path="general/logo.png" alt="logo" className='logo'/>
        </Link>
        <Link to="/" className='menuIcon'>
          <ImageElement path="general/home.svg" alt="home" />
        </Link>
        <Link to="/create" className='menuIcon'>
          <ImageElement path="general/create.svg" alt="create" />
        </Link>
        <Link to="/" className='menuIcon'>
          <ImageElement path="general/updates.svg" alt="updates" />
        </Link>
        <Link to="/" className='menuIcon'>
          <ImageElement path="general/messages.svg" alt="messages" />
        </Link>
      </div>
      <Link to="/" className='menuIcon'>
          <ImageElement path="general/settings.svg" alt="settings" />
        </Link>
      
    </div>
  )
}

export default LeftBar
