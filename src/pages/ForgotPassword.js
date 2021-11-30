import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
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

const Forgot = () => {
  const classes = useStyles()
  // create state variables for each input
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      email: email,
    }
    axios
      .post('http://joyrideapp.herokuapp.com/users/forgot', data)
      .then((res) => {
        setLoading(false)
        if (res.data.hasError === false) {
          setEmail('')
          localStorage.setItem('email', res.data.email)
          toast.success(res.data.message)
        } else {
          toast.error(res.data.message)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error('sorry something went wrong')
      })
  }

  return (
    <div className='container'>
      <div className='img'></div>
      <div className='form'>
        <form className={classes.root} onSubmit={handleSubmit}>
          <h2>Forgot Password</h2>
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
          <div className='write'>
            <NavLink to='/auth/login' className='link'>
              Login
            </NavLink>
          </div>
          <div className='button'>
            <button disabled={loading}>
              {loading ? <CircularIndeterminate /> : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Forgot
