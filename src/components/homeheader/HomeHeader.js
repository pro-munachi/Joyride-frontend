import React from 'react'

import logo from '../../images/cover.png'
import './HomeHeader.css'

const HomeHeader = () => {
  return (
    <header className='home-header'>
      <img src={logo} alt='logo' />
    </header>
  )
}

export default HomeHeader
