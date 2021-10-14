import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@material-ui/core/Divider'
import { NavLink } from 'react-router-dom'

import '../style/user.css'

export default function PositionedMenu({ id }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
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
        <NavLink to={`/users/${id}`} className='styles'>
          Delete User
        </NavLink>
        <Divider />
        <NavLink to={`/users/${id}`} className='styles'>
          Edit User
        </NavLink>
        <Divider />
        <NavLink to={`/users/${id}`} className='styles'>
          View User
        </NavLink>
      </Menu>
    </div>
  )
}
