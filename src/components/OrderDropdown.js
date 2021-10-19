import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import axios from 'axios'
// import MenuItem from '@mui/material/MenuItem'
// import Divider from '@material-ui/core/Divider'
// import { NavLink } from 'react-router-dom'

import '../style/user.css'

export default function OrderDropdown({ id }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
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
      })
      .catch((err) => {
        console.log(err)
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
        <Button onClick={handleDelete} className='styles'>
          Delete Order
        </Button>
      </Menu>
    </div>
  )
}
