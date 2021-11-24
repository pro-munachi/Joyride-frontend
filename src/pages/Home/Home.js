import React from 'react'
import HomeBody from '../../components/homebody/HomeBody'
import HomeHeader from '../../components/homeheader/HomeHeader'
import HomeMiddle from '../../components/homemiddle/HomeMiddle'
import './Home.css'

const Home = () => {
  return (
    <div className='home'>
      <HomeHeader />
      <HomeBody />
      <HomeMiddle />
    </div>
  )
}

export default Home
