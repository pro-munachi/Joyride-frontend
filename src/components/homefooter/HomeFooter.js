import React from 'react'

import './HomeFooter.css'
import image from '../../assets/svgs/magic.svg'
import { NavLink } from 'react-router-dom'

const HomeFooter = () => {
  return (
    <div className='homefooter'>
      <div className='homefooter-first'>
        <div className='homefooter-first-div1'>
          <h2>Get Started With Joyride</h2>
          <p>
            It only takes a minute to set up your account and you are good to go
          </p>
        </div>

        <div className='homefooter-first-div2'>
          <p>Ready For You</p>
          <p>Fast And Reliable</p>

          <NavLink to='/auth/signup'>
            <button>Signup To Joyride Now</button>
          </NavLink>
        </div>
      </div>
      <div className='homefooter-second'>
        <p>Contact Us</p>
        <h2> Madustanley1@gmail.com, 08165998708</h2>
      </div>
    </div>
  )
}

export default HomeFooter
