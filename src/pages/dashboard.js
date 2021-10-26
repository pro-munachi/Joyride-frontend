import React from 'react'
import ResponsiveDrawer from '../components/sidebar'
import MyChart from '../components/Chart'

const dashboard = () => {
  return (
    <ResponsiveDrawer>
      <div>Total</div>
      <div>total for today</div>
      <div>total order</div>
      <div>order for today</div>
      <MyChart />
    </ResponsiveDrawer>
  )
}

export default dashboard
