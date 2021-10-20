import axios from 'axios'
import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ResponsiveDrawer from '../components/sidebar'
import '../style/viewuser.css'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const EditUser = () => {
  const [user, setUser] = useState([])
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('password')

  let { id } = useParams()
  console.log(id)

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get(`https://kidsio.herokuapp.com/users/${id}`, { headers: headers })
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

  const handleClick = () => {
    if (mode === 'password') {
      setMode('text')
    } else {
      setMode('password')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      displayName: displayName,
      email: email,
      password: password,
      passwordCheck: confirmPassword,
    }
  }

  return (
    <ResponsiveDrawer>
      {' '}
      <div className='user-container'>
        <div className='user-profile'>
          <div className='h2'>{user.displayName}'s Profile</div>
          <div className='user-contact'>
            <div className='user-image'>
              <img src={user.profilePic} alt='user' />
            </div>
            <div className='empty' />
            <div className='user-details'>
              <div>
                Display Name: <span>{user.displayName}</span>
              </div>
              <p>
                Email: <span>{user.email}</span>
              </p>
              <p>
                Is Admin: <span>{user.isAdmin ? 'True' : 'False'}</span>
              </p>
              <p>
                Created At: <span>{user.createdAt}</span>
              </p>
            </div>
          </div>
        </div>
        <Divider />
        <div className='user-orders'>
          <div className='h2'>{user.displayName}'s Latest Orders</div>
          <div className='form'>
            <form onSubmit={handleSubmit}>
              <h2>Signup</h2>
              <label className='label'>
                Name
                <input
                  type='text'
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className='input'
                  placeholder={user.displayName}
                />
              </label>
              <label className='label'>
                Email
                <input
                  type='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='input'
                  placeholder={user.email}
                />
              </label>
              <ToastContainer />

              <div>
                <button className='button'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ResponsiveDrawer>
  )
}

export default EditUser
