import React from 'react'

import './HomeMiddle.css'
import circles from '../../assets/svgs/boxcircles.svg'
import boxbackground from '../../assets/svgs/boxbackground.svg'
import fourth from '../../assets/images/fourth.PNG'

const HomeMiddle = () => {
  return (
    <div className='homemiddle'>
      <div className='first'>
        <div>
          <h1 c>Customized Invoice template</h1>

          <p>
            Midrapay provides a Perfectly formatted invoice with a good layout
            that highlight the details such as price, product, etc. to the
            customer easily.
          </p>
        </div>
        <div className='homemiddle-firstimg'>
          <div className='firstcircle'>
            <img src={circles} alt='hero' />{' '}
          </div>
          <div className='secondcircle'>
            <img src={fourth} alt='hero' />{' '}
          </div>
          <div className='thirdcircle'>
            <img src={boxbackground} alt='hero' />{' '}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeMiddle
