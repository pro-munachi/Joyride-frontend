import React from 'react'
import Slide from 'react-reveal/Slide'

import './HomeBody.css'
import first from '../../assets/images/first.PNG'
import second from '../../assets/images/second.PNG'
import third from '../../assets/images/third.PNG'
import { NavLink } from 'react-router-dom'

const HomeBody = () => {
  return (
    <div className='home-body'>
      <div className='first'>
        <div>
          <div>
            <h1>Welcome To Joyride</h1>

            <p>
              Try Joyride to have a smooth and seamless experience for your
              goods while transporting them from one location to another, <br />
              We promise safe delivery of both perishable and non parishable
              goods across the state, with quick response time like you have
              never seen before <br />
              Try us, even your goods deserves a smooth ride with Joyride
            </p>

            <span className='heroButton'>
              <NavLink to='/dashboard' className='heronav'>
                <button>Try Joyride</button>
              </NavLink>
            </span>
          </div>
        </div>
        <div className='first-img'>
          <Slide right>
            <img src={first} alt='hero' />
          </Slide>
        </div>
      </div>

      <div className='second'>
        <div>
          <div>
            <h1>Creating Orders Seamless</h1>

            <p>
              Joyride makes it easy to book a dispatcher, through the app, you
              also get in app notifications and emails through out the process
              of delivery so you get to relax and worry less about your product.
            </p>
          </div>
        </div>
        <div className='homebodysecondimage'>
          <div>
            <Slide left>
              <img src={second} alt='hero' />
            </Slide>
          </div>
        </div>
      </div>

      <div className='third'>
        <div className='third-img'>
          <Slide right>
            <img src={third} alt='hero' />
          </Slide>
        </div>
        <div className='third-text'>
          <div>
            <h1>Visualize Expenses</h1>

            <p>
              Joyride provides a Perfectly displayed dashboard with a good
              layout that highlight details such as expenses in graphs, to
              monitor daily and all expenses made using the app
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeBody
