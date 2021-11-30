import * as React from 'react'
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import axios from 'axios'
import Divider from '@material-ui/core/Divider'
import { NavLink } from 'react-router-dom'

import '../style/user.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function OrderDropdown({ id, refresh }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const [dispatcher, setDispatcher] = useState([])
  const [dispatch, setDispatch] = useState([])
  const [mode, setMode] = useState(false)
  const [drop, setDrop] = useState(false)
  const [price, setPrice] = useState('')
  const [amount, setAmount] = useState('')

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }

    axios
      .get('https://joyrideapp.herokuapp.com/dispatch/active', {
        headers: headers,
      })
      .then((res) => {
        setDispatcher(res.data.dispatcher)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

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
      .delete(`https://joyrideapp.herokuapp.com/orders/delete/${id}`, {
        headers: headers,
      })
      .then((res) => {
        toast.success('Order deleted successfully')
        refresh()
      })
      .catch((err) => {
        console.log(err)
        toast.error('Sorry something went wrong')
      })
  }

  const handleDeliver = () => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get(`https://joyrideapp.herokuapp.com/orders/deliver/${id}`, {
        headers: headers,
      })
      .then((res) => {
        toast.success('Order delivered successfully')
        refresh()
      })
      .catch((err) => {
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
      .post('https://joyrideapp.herokuapp.com/orders/orderIsPaid', body, {
        headers: headers,
      })

      .then((res) => {
        if (res.data.message === 'Price has already been added by an admin') {
          toast.error(res.data.message)
        } else {
          toast.success('price added successfully')
          setMode(false)
          refresh()
        }
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  const handleDispatch = () => {
    const body = {
      id: id,
      amount: amount,
      dispatcherId: dispatch,
    }
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }

    axios
      .post('https://joyrideapp.herokuapp.com/orders/dispatchorder', body, {
        headers: headers,
      })
      .then((res) => {
        if (res.data.hasError === false) {
          toast.success('Order dispatched successfully')
          setDrop(false)
          refresh()
        } else {
          toast.error(res.data.message)
          console.log(res.data)
        }
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  return (
    <div style={{ position: 'relative' }}>
      {mode ? (
        <>
          <p className='cancel'>X</p>
          <div
            onClick={() => setMode(false)}
            className='backdrop'
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 0,
            }}
          ></div>
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
        </>
      ) : null}

      {drop ? (
        <>
          <div onClick={() => setDrop(false)} className='backdrop'></div>
          <form className='dropdown'>
            <p onClick={() => setDrop(false)}>X</p>
            <label>
              Select a dispatcher
              <select
                className='input'
                onChange={(e) => setDispatch(e.target.value)}
              >
                <option value='Select a dispatcher'>Select a dispatcher</option>
                {dispatcher.map((user) => (
                  <React.Fragment key={user._id}>
                    <option value={user._id}>{user.displayName}</option>
                  </React.Fragment>
                ))}
              </select>
            </label>
            <label>
              Amount paid to dispatcher
              <input
                value={amount}
                type='number'
                onChange={(e) => setAmount(e.target.value)}
                className='input'
                placeholder='Shipping fee'
              />
            </label>
            <label>
              <button type='button' onClick={handleDispatch}>
                Submit
              </button>
            </label>
          </form>
        </>
      ) : null}
      <Button
        id='demo-positioned-button'
        aria-controls='demo-positioned-menu'
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ fontWeight: 700, fontSize: 20 }}
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
        <Button component={NavLink} to={`/order/${id}`} className='styles'>
          View Order
        </Button>
        <Divider />
        <Button onClick={addClick} className='styles'>
          Add Price
        </Button>
        <Divider />
        <Button onClick={() => setDrop(!drop)} className='styles'>
          Dispatch
        </Button>
        <Divider />
        <Button
          onClick={() => {
            if (
              window.confirm('Are you sure that this order has been delivered')
            ) {
              handleDeliver()
            }
          }}
          className='styles'
        >
          Delivered
        </Button>
      </Menu>
    </div>
  )
}
