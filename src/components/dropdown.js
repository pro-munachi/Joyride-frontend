import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@material-ui/core/Divider'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import MessageIcon from '@mui/icons-material/Message'

import '../style/sidebar.css'

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [notification, setNotification] = useState([])

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }

    axios
      .get('https://kidsio.herokuapp.com/notifications/getUser', {
        headers: headers,
      })
      .then((res) => {
        setNotification(res.data.notify)
      })
  }, [])

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onClick = (id) => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get(`https://kidsio.herokuapp.com/notifications/${id}`, {
        headers: headers,
      })
      .then((res) => {
        let notif = notification
        console.log(res.data)
        for (let i = 0; i < notif.length; i++) {
          if (notif[i]._id === id) {
            notif[i].isSeen = true
            console.log(notif)
          }
        }
        setNotification(notif)
      })
  }

  const updateAll = (e) => {
    e.preventDefault()
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get('https://kidsio.herokuapp.com/notifications/updateUsers', {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data)
      })
  }

  return (
    <div>
      <Button
        id='basic-button'
        aria-controls='basic-menu'
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <NotificationsNoneIcon className='side-icon' />
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className='menu-dropdown'
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div className='notify-head'>
          <p>Notifications</p>
          <button onClick={updateAll}>Mark all as read</button>
        </div>
        {notification.map((item) => {
          return item.isSeen === false ? (
            <div className='notify-menu'>
              <MenuItem key={item.id} onClick={() => onClick(item._id)}>
                <MessageIcon className='notify-icon' />
                <p className='notify-text'>{item.message}</p>
              </MenuItem>
            </div>
          ) : (
            <MenuItem key={item.id} onClick={() => onClick(item._id)}>
              <MessageIcon className='notify-icon' />
              <p className='notify-text'>{item.message}</p>
            </MenuItem>
          )
        })}
      </Menu>
    </div>
  )
}