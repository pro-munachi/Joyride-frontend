import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import axios from 'axios'
// import MenuItem from '@mui/material/MenuItem'
import Divider from '@material-ui/core/Divider'
import { NavLink } from 'react-router-dom'

import '../style/user.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function DispatchMenu({ id, refresh }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSuspend = () => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get(`https://joyrideapp.herokuapp.com/dispatch/suspend/${id}`, {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data)
        toast.success(res.data.message)
        refresh()
      })
      .catch((err) => {
        console.log(err)
        toast.error('Sorry something went wrong')
      })
  }

  const handleDelete = () => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get(`https://joyrideapp.herokuapp.com/dispatch/delete/${id}`, {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data)
        toast.success(res.data.message)
        refresh()
      })
      .catch((err) => {
        console.log(err)
        toast.error('Sorry something went wrong')
      })
  }

  return (
    <div>
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
                'Are you sure you want to suspend this dispatcher?'
              )
            ) {
              handleSuspend()
            }
          }}
          className='styles'
        >
          Suspend Dispatcher
        </Button>
        <Divider />
        <Button component={NavLink} to={`/user/${id}`} className='styles'>
          View Dispatcher
        </Button>
        <Divider />
        <Button
          onClick={() => {
            if (
              window.confirm('Are you sure you want to delete this dispatcher?')
            ) {
              handleDelete()
            }
          }}
          className='styles'
        >
          Delete Dispatcher
        </Button>
      </Menu>
    </div>
  )
}
