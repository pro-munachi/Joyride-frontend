import React from 'react'

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
            <h1>Brand Personality & Identity</h1>

            <p>
              Your brand’s identity demonstrates your personality,
              professionalism and expertise.When you strengthen your identity
              you increase the chances of getting paid on-time. Midrapay
              invoicing app allows business owners add their logo, complete
              company details and other customised messages to improve brand
              presence and brand engagement with existing customers.
            </p>

            <span className='heroButton'>
              <NavLink to='/dashboard' className='heronav'>
                <button>Try Joyride</button>
              </NavLink>
            </span>
          </div>
        </div>
        <div className='first-img'>
          <img src={first} alt='hero' />
        </div>
      </div>

      <div className='second'>
        <div>
          <div>
            <h1>Customized Invoice template</h1>

            <p>
              Midrapay provides a Perfectly formatted invoice with a good layout
              that highlight the details such as price, product, etc. to the
              customer easily.
            </p>
          </div>
        </div>
        <div className='homebodysecondimage'>
          <div>
            <img src={second} alt='hero' />
          </div>
        </div>
      </div>

      <div className='third'>
        <div>
          <img src={third} alt='hero' />
        </div>
        <div className='third-text'>
          <div>
            <h1>Customized Invoice template</h1>

            <p>
              Midrapay provides a Perfectly formatted invoice with a good layout
              that highlight the details such as price, product, etc. to the
              customer easily.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeBody
