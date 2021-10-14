import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import axios from 'axios'
import { useHistory, NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import '../style/login.css'
import 'react-toastify/dist/ReactToastify.css'

import CircularIndeterminate from '../components/loader'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    marginTop: '30%',

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

const Login = () => {
  const History = useHistory()

  const classes = useStyles()
  // create state variables for each input
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('password')

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      email: email,
      password: password,
    }

    const headers = {
      'Custom-Header': 'xxxx-xxxx-xxxx-xxxx',
    }
    axios
      .post('https://kidsio.herokuapp.com/users/login', data, headers)
      .then((res) => {
        console.log(res.data)
        setLoading(false)
        if (res.data.hasError === false) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('name', res.data.displayName)
          localStorage.setItem('id', res.data._id)
          localStorage.setItem('email', res.data.email)
          localStorage.setItem('pic', res.data.profilePic)
          localStorage.setItem('admin', res.data.isAdmin)
          toast.success('login successful')
          window.setTimeout(() => {
            History.push('/')
            setEmail('')
            setPassword('')
          }, 2000)
        } else {
          toast.error(res.data.error)
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
      <div className='form'>
        <form className={classes.root} onSubmit={handleSubmit}>
          <h2>Login</h2>
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
          <ToastContainer />
          <div className='write'>
            <NavLink to='/auth/forgot-password' className='link'>
              Forgot password?
            </NavLink>
            <NavLink to='/auth/signup' className='link'>
              Sign up
            </NavLink>
          </div>

          <div>
            <button className='button' disabled={loading}>
              {loading ? <CircularIndeterminate /> : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
