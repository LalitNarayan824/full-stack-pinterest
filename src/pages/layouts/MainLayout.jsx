import React from 'react'
import LeftBar from '../../components/leftBar/LeftBar'
import TopBar from '../../components/topBar/TopBar'
import {Outlet} from 'react-router'


const MainLayout = () => {
  return (
    <div className="app">
      <LeftBar/>
      <div className="content">
        <TopBar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout
