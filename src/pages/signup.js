import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import axios from 'axios'
import { useHistory, NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../style/signup.css'
import 'react-toastify/dist/ReactToastify.css'

import CircularIndeterminate from '../components/loader'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },

  input: {
    padding: '25px 250px',
  },
}))

const Signup = () => {
  const History = useHistory()

  const classes = useStyles()
  // create state variables for each input
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('password')

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      displayName: displayName,
      email: email,
      password: password,
      phoneNumber: number,
      passwordCheck: confirmPassword,
    }

    const headers = {}
    axios
      .post('https://joyrideapp.herokuapp.com/users/register', data, headers)
      .then((res) => {
        setLoading(false)
        if (res.data.hasError === false) {
          console.log(res.data)
          setDisplayName('')
          setEmail('')
          setPassword('')
          setConfirmPassword('')
          setNumber('')
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('name', res.data.displayName)
          localStorage.setItem('id', res.data._id)
          localStorage.setItem('email', res.data.email)
          localStorage.setItem('phone', res.data.phoneNumber)
          localStorage.setItem('pic', res.data.profilePic)
          window.setTimeout(() => {
            window.location.href = '/dashboard'
          }, 1000)
          toast.success('Registration successful')
        } else {
          toast.error(res.data.message)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error('sorry something went wrong')
      })
  }

  const handleClick = () => {
    if (mode === 'password') {
      setMode('text')
    } else {
      setMode('password')
    }
  }

  return (
    <div className='container'>
      <div className='img'></div>
      <div className='forms'>
        <form className={classes.root} onSubmit={handleSubmit}>
          <h2>Signup</h2>
          <label className='label'>
            Name
            <input
              type='text'
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className='input'
              placeholder='Name'
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
              placeholder='Email'
            />
          </label>
          <label className='label'>
            Phone Number
            <input
              type='number'
              required
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className='input'
              placeholder='Phone Number'
            />
          </label>
          <label className='label'>
            Password
            <input
              type={mode}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='input'
              placeholder='Password'
            />
            {mode === 'password' ? (
              <VisibilityIcon className='icon' onClick={handleClick} />
            ) : (
              <VisibilityOff className='icon' onClick={handleClick} />
            )}
          </label>
          <label className='label'>
            Password
            <input
              type={mode}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='input'
              placeholder='Confirm Password'
            />
            {mode === 'password' ? (
              <VisibilityIcon className='icon' onClick={handleClick} />
            ) : (
              <VisibilityOff className='icon' onClick={handleClick} />
            )}
          </label>

          <div className='write'>
            <NavLink to='/auth/login' className='link'>
              Login
            </NavLink>
          </div>

          <div className='buttons'>
            <button disabled={loading}>
              {loading ? <CircularIndeterminate /> : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
