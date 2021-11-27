import React from 'react'
import { NavLink } from 'react-router-dom'
import './ErrorPage.css'

const ErrorPage = () => {
  return (
    <div className='page_404'>
      <div className='container'>
        <div className='row'>
          <div>
            <div>
              <div className='four_zero_four_bg'>
                <h1 className='text-center '>404</h1>
              </div>

              <div className='contant_box_404'>
                <h3 className='h2'>Look like you're lost</h3>

                <p>the page you are looking for is not avaible!</p>

                <NavLink to='/' className='link_404'>
                  Go to Home
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
