import React from 'react'
import HomeBody from '../../components/homebody/HomeBody'
import HomeHeader from '../../components/homeheader/HomeHeader'
import HomeMiddle from '../../components/homemiddle/HomeMiddle'
import HomeFooter from '../../components/homefooter/HomeFooter'
import './Home.css'

const Home = () => {
  return (
    <div className='home'>
      <HomeHeader />
      <HomeBody />
      <HomeMiddle />
      <HomeFooter />
    </div>
  )
}

export default Home
