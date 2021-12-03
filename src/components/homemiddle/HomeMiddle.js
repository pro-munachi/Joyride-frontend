import { React, useState, Fragment } from 'react'
import Slide from 'react-reveal/Slide'
import Roll from 'react-reveal/Roll'

import './HomeMiddle.css'
import circles from '../../assets/svgs/boxcircles.svg'
import fourth from '../../assets/images/fourth.PNG'
import user1 from '../../assets/images/muna.jpg'
import user2 from '../../assets/images/bobby.jpg'
import user3 from '../../assets/images/favour.jpg'

const HomeMiddle = () => {
  const [show, setShow] = useState(
    'I have been using joyride and found it fantastic. I use joyride to manage my orders, the experience has been good.Easy to use software that I would recommend to everyone'
  )

  const users = [
    {
      id: 1,
      name: 'Muna',
      Image: user1,
      text: 'I have been using joyride and found it fantastic. I use joyride to manage my orders, the experience has been good.Easy to use software that I would recommend to everyone',
    },
    {
      id: 2,
      name: 'Bobby',
      Image: user2,
      text: '  With ease to create orders , Joyride helps me to track my expenses. I can easily create orders which are a top priority for my business',
    },
    {
      id: 3,
      name: 'Evangel',
      Image: user3,
      text: '     I have been using Joyride for years and i will be lost without it, it helps me in getting my orders quickly. it is reliable.',
    },
  ]
  return (
    <div className='homemiddle'>
      <div className='homemiddle-first'>
        <div>
          <h1>View All Orders</h1>

          <p>
            With Joyride, you also have access to all your previous orders, and
            can always go back in time to review that awsome order you made with
            us.
          </p>
        </div>
        <div className='homemiddle-firstimg'>
          <div className='firstcircle'>
            <img src={circles} alt='hero' />{' '}
          </div>
          <div className='secondcircle'>
            <Slide left>
              <img src={fourth} alt='hero' />{' '}
            </Slide>
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
                  <Roll>
                    <img
                      src={user.Image}
                      onClick={() => setShow(user.text)}
                      className={
                        show === user.text
                          ? 'homemiddle-secondcontainer2img'
                          : 'homemiddle-secondcontainer2img1'
                      }
                    />
                  </Roll>
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
