import axios from 'axios'
import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'

import ResponsiveDrawer from '../components/sidebar'
import '../style/viewuser.css'

const ViewUser = () => {
  const [user, setUser] = useState([])
  const [order, setOrder] = useState([])

  let { id } = useParams()
  console.log(id)

  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`,
  }

  useEffect(() => {
    axios
      .get(`https://kidsio.herokuapp.com/users/${id}`, { headers: headers })
      .then((res) => {
        setUser(res.data)
        console.log(res.data)
        console.log(user)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    axios
      .get('https://kidsio.herokuapp.com/orders/getUser', { headers: headers })
      .then((res) => {
        setOrder(res.data.slice)
        console.log(res.data.slice)
        console.log(order)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <ResponsiveDrawer>
      {' '}
      <div className='user-container'>
        <div className='user-profile'>
          <div className='user-image'>
            <img src={user.profilePic} alt='user' />
          </div>
          <div className='user-details'>
            <div>
              Email: <span>{user.email}</span>
            </div>
            <p>
              Display Name: <span>{user.displayName}</span>
            </p>
            <p>
              Is Admin: <span>{user.isAdmin ? 'True' : 'False'}</span>
            </p>
            <p>
              Created At: <span>{user.createdAt}</span>
            </p>
          </div>
        </div>
        <Divider />
        <div className='user-orders'>
          <h2>{user.displayName}'s Current Orders</h2>
          <div></div>
        </div>
      </div>
    </ResponsiveDrawer>
  )
}

export default ViewUser
