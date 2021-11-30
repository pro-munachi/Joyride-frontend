import { Button } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

import logo from '../../images/cover.png'
import './HomeHeader.css'

const HomeHeader = () => {
  return (
    <header className='home-header'>
      <img src={logo} alt='logo' />

      {!localStorage.getItem('token') ? (
        <div className='head-cont'>
          <NavLink to='/auth/login' className='nav-link'>
            Login
          </NavLink>
          <NavLink to='/auth/signup' className='nav-link'>
            Sign up
          </NavLink>{' '}
        </div>
      ) : (
        <div className='head-cont'>
          <NavLink to='/dashboard' className='nav-link'>
            Dashboard
          </NavLink>
        </div>
      )}
    </header>
  )
}

export default HomeHeader
