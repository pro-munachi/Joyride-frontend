import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
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

const Reset = () => {
  const History = useHistory()

  const classes = useStyles()
  // create state variables for each input
  const [confirmPassword, setConfirmPassword] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('password')

  let { token } = useParams()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    const data = {
      password: password,
      token: token,
    }

    const headers = {
      'Custom-Header': 'xxxx-xxxx-xxxx-xxxx',
    }
    axios
      .post('https://kidsio.herokuapp.com/users/reset', data, headers)
      .then((res) => {
        setLoading(false)
        if (res.data.hasError === false) {
          toast.success('login successful')
          History.push('/auth/login')
          toast.success('login successful')
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
          <h2>Reset Password</h2>
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
            Confirm Password
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
          <ToastContainer />
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

export default Reset
