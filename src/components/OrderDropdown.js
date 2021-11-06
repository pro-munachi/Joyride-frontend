import * as React from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import axios from 'axios'
// import MenuItem from '@mui/material/MenuItem'
import Divider from '@material-ui/core/Divider'
import { NavLink } from 'react-router-dom'

import '../style/user.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function OrderDropdown({ id }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const [mode, setMode] = useState(false)
  const [price, setPrice] = useState('')

  const addClick = () => {
    setMode(!mode)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .delete(`https://kidsio.herokuapp.com/orders/delete/${id}`, {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data)
        toast.success('Order Deleted Successfully')
      })
      .catch((err) => {
        console.log(err)
        toast.error('Sorry something went wrong')
      })
  }

  const handleSubmit = () => {
    const body = {
      id: id,
      amount: price,
    }
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }

    axios
      .post('https://kidsio.herokuapp.com/orders/orderIsPaid', body, {
        headers: headers,
      })
      .then((res) => {
        console.log('object')
        console.log(res.data)
        toast.success('price added successfully')
      })
      .catch((err) => {
        console.log('dfdf')
      })
  }

  return (
    <div style={{ position: 'relative' }}>
      {mode ? (
        <form className='addform'>
          <input
            type='text'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='amount'
          />
          <button type='button' onClick={handleSubmit}>
            confirm
          </button>
        </form>
      ) : null}
      <Button
        id='demo-positioned-button'
        aria-controls='demo-positioned-menu'
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        ...
      </Button>
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Button
          onClick={() => {
            if (
              window.confirm(
                'Are you sure you want to permanently delete this order?'
              )
            ) {
              handleDelete()
            }
          }}
          className='styles'
        >
          Delete Order
        </Button>
        <Divider />
        <Button component={NavLink} to={`/orders/${id}`} className='styles'>
          View Order
        </Button>
        <Divider />
        <Button onClick={addClick} className='styles'>
          Add Price
        </Button>
      </Menu>
    </div>
  )
}
