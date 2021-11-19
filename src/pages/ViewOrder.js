import * as React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import TableRow from '@mui/material/TableRow'
import { withRouter } from 'react-router'
import Moment from 'react-moment'

import ResponsiveDrawer from '../components/sidebar'
import '../style/user.css'
// import PositionedMenu from '../components/ActiveDropdown'
import PageLoader from '../components/pageloader'
import { useParams } from 'react-router'
import '../style/vieworder.css'

const Orders = () => {
  const [order, setOrder] = useState([])
  const [orderItems, setOrderItems] = useState([])
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  console.log(id)

  useEffect(() => {
    setLoading(true)
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get(`https://kidsio.herokuapp.com/orders/${id}`, { headers: headers })
      .then((res) => {
        console.log(res.data.order)
        setOrder(res.data.order)
        setOrderItems(res.data.order.orderItems)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [id])

  return (
    <div className='user'>
      <ResponsiveDrawer>
        {' '}
        {loading ? (
          <PageLoader />
        ) : (
          <div className='order-container'>
            <h2>Order Details</h2>
            <div className='details'>
              <div>
                <span>User:</span>
                <span className='span1'>{order.userName}</span>
              </div>
              <div>
                <span>Number:</span>
                <span className='span1'>{order.number}</span>
              </div>
              <div>
                <span>Payment Method:</span>
                <span className='span1'>{order.paymentMethod}</span>
              </div>
              <div>
                <span>Shipping Price:</span>
                <span className='span1'>{order.shippingPrice}</span>
              </div>
              <div>
                <span>Time:</span>
                <span className='span1'>
                  <Moment format='D MMM YYYY' withTitle>
                    {order.createdAt}
                  </Moment>
                </span>
              </div>
              <div>
                <span>Delivered:</span>
                <span className='span1'>
                  {order.isDelivered ? 'Yes' : 'No'}
                </span>
              </div>
              <div>
                <span>Price:</span>
                {order.totalPrice && (
                  <span className='span1'>
                    {order.totalPrice
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                  </span>
                )}
              </div>
            </div>
            <div className='order-name'>
              <h2>Order Name</h2>
              {orderItems.map((item) => (
                <div key={item._id}>
                  <span>Name:</span>
                  <span className='span1'>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </ResponsiveDrawer>
    </div>
  )
}

export default withRouter(Orders)
