import axios from 'axios'
import { React, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { toast } from 'react-toastify'
import { withRouter } from 'react-router'

import '../style/changepassword.css'
import CircularIndeterminate from '../components/loader'

const ChangePassword = () => {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('password')

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      password: password,
      newPassword: newPassword,
    }

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    if (newPassword === confirmPassword) {
      setLoading(true)
      axios
        .post('http://kidsio.herokuapp.com/users/change', data, {
          headers: headers,
        })
        .then((res) => {
          setLoading(false)
          if (res.data.hasError === false) {
            setPassword('')
            setNewPassword('')
            setConfirmPassword('')
            toast.success(res.data.message)
          } else {
            toast.error(res.data.message)
          }
        })
        .catch((err) => {
          setLoading(true)
          toast.error('sorry something went wrong')
        })
    } else {
      toast.error('New password must match Confirm password')
    }
  }

  const modeChange = () => {
    if (mode === 'password') {
      setMode('text')
    } else {
      setMode('password')
    }
  }

  return (
    <div className='containers'>
      <form onSubmit={handleSubmit} className='forms'>
        <label className='form-label'>
          Current Password
          <input
            type={mode}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='input'
            placeholder='Old Password'
          />
          {mode === 'password' ? (
            <VisibilityIcon className='change-icon' onClick={modeChange} />
          ) : (
            <VisibilityOff className='change-icon' onClick={modeChange} />
          )}
        </label>
        <label className='form-label'>
          New Password
          <input
            type={mode}
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='input'
            placeholder='New Password'
          />
          {mode === 'password' ? (
            <VisibilityIcon className='change-icon' onClick={modeChange} />
          ) : (
            <VisibilityOff className='change-icon' onClick={modeChange} />
          )}
        </label>
        <label className='form-label'>
          Confirm New Password
          <input
            type={mode}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='input'
            placeholder='Confirm New Password'
          />
          {mode === 'password' ? (
            <VisibilityIcon className='change-icon' onClick={modeChange} />
          ) : (
            <VisibilityOff className='change-icon' onClick={modeChange} />
          )}
        </label>
        <div className='change-button'>
          <button disabled={loading}>
            {loading ? <CircularIndeterminate /> : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default withRouter(ChangePassword)
