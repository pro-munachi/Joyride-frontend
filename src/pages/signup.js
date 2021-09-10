import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from 'axios'

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
}))

const Signup = () => {
  const classes = useStyles()
  // create state variables for each input
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setIsError(false)
    const data = {
      email: email,
      password: password,
    }
    const headers = {
      Authorization: 'Bearer my-auth-token',
      'Custom-Header': 'xxxx-xxxx-xxxx-xxxx',
    }
    axios
      .post('https://kidsio.herokuapp.com/users/login', data, headers)
      .then((res) => {
        setData(res.data)
        setEmail('')
        setPassword('')
        setLoading(false)
        console.log(res.data)
      })
      .catch((err) => {
        setLoading(false)
        setIsError(true)
      })
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label='Email'
        variant='filled'
        type='email'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label='Password'
        variant='filled'
        type='password'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <Button type='submit' variant='contained' color='primary'>
          Signup
        </Button>
      </div>
    </form>
  )
}

export default Signup
