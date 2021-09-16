import axios from 'axios'
import { React, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

import '../style/changepassword.css'

const ChangePassword = () => {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    setLoading(false)
    const data = {
      password: password,
      newPassword: newPassword,
    }

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }

    axios
      .post('http://kidsio.herokuapp.com/users/change', data, {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data)
        if (res.data.hasError === false) {
          setLoading(true)
          toast.success(res.data.message)
        } else {
          toast.error(res.data.message)
        }
      })
      .catch((err) => {
        console.log('eweee')
      })

    console.log('muna')
  }

  return (
    <div className='containers'>
      <form onSubmit={handleSubmit} className='forms'>
        <label className='label'>
          Old Password
          <input
            type='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='input'
            placeholder='Old Password'
          />
        </label>
        <label className='label'>
          New Password
          <input
            type='password'
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='input'
            placeholder='New Password'
          />
        </label>
        <label className='label'>
          Confirm New Password
          <input
            type='password'
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='input'
            placeholder='Confirm New Password'
          />
        </label>
        <ToastContainer />
        <div>
          <button className='button'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword
