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

export default function OrderUserDropdown({ id, refresh }) {
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
      .get(`https://kidsio.herokuapp.com/orders/user/${id}/delete`, {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data)
        toast.success('Order Deleted Successfully')
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
      </Menu>
    </div>
  )
}
