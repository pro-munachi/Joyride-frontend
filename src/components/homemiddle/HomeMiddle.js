import { React, useState, Fragment } from 'react'

import './HomeMiddle.css'
import circles from '../../assets/svgs/boxcircles.svg'
import boxbackground from '../../assets/svgs/boxbackground.svg'
import fourth from '../../assets/images/fourth.PNG'
import user1 from '../../assets/images/muna.jpg'
import user2 from '../../assets/images/bobby.jpg'
import user3 from '../../assets/images/favour.jpg'

const HomeMiddle = () => {
  const [show, setShow] = useState(
    'I have been using midrapay and found it fantastic. I usemidrapay to manage my business, the experience has been good.Easy to use software that I would recommend to everyone'
  )

  const users = [
    {
      id: 1,
      name: 'Muna',
      Image: user1,
      text: 'I have been using midrapay and found it fantastic. I usemidrapay to manage my business, the experience has been good.Easy to use software that I would recommend to everyone',
    },
    {
      id: 2,
      name: 'Bobby',
      Image: user2,
      text: '  With easy to use invoicing solution, Midrapay helps me to track billable hours and generate detailed invoices forclients. I can easily create customized clean invoices whichare a top priority for my business',
    },
    {
      id: 3,
      name: 'Favour',
      Image: user3,
      text: '     I have been using mobile invoicing app Invoice2go for years and i will be lost without it',
    },
  ]
  return (
    <div className='homemiddle'>
      <div className='homemiddle-first'>
        <div>
          <h1>Customized Invoice template</h1>

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

      <div className='homemiddle-second'>
        <div className='homemiddle-secondcontainer'>
          <div className='homemiddle-secondcontainer1'>
            <h4>TESTIMONIALS</h4>
            <h2>We Love To Hear From Our Users</h2>
            <p>
              Joyride has taken the dispatch community by storm, but dont just
              take our word for it
            </p>
          </div>

          <div className='homemiddle-secondcontainer2'>
            <div>
              {users.map((user) => (
                <Fragment key={user.id}>
                  {show === user.text && <p>{user.text}</p>}
                </Fragment>
              ))}
            </div>

            <div className='homemiddle-secondcontainer2-imgcontainer'>
              {users.map((user) => (
                <div key={user.id} className='frag'>
                  <img
                    src={user.Image}
                    onClick={() => setShow(user.text)}
                    className={
                      show === user.text
                        ? 'homemiddle-secondcontainer2img'
                        : 'homemiddle-secondcontainer2img1'
                    }
                  />
                  <p className={show === user.text ? 'fragp' : 'fragp1'}>
                    {user.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeMiddle
