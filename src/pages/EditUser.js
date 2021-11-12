import axios from 'axios'
import { React, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { toast } from 'react-toastify'
import { withRouter } from 'react-router'

import '../style/changepassword.css'
import CircularIndeterminate from '../components/loader'

const EditUser = () => {
  const [displayName, setdisplayName] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      displayName: displayName,
      number: number,
      email: email,
    }

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    setLoading(true)
    axios
      .post('http://kidsio.herokuapp.com/users/edit', data, {
        headers: headers,
      })
      .then((res) => {
        setLoading(false)
        if (res.data.hasError === false) {
          setdisplayName('')
          setNumber('')
          setEmail('')
          toast.success(res.data.message)
        } else {
          toast.error(res.data.message)
        }
      })
      .catch((err) => {
        setLoading(true)
        toast.error('sorry something went wrong')
      })
  }

  return (
    <div className='containers'>
      <form className='forms'>
        <label className='form-label'>
          Email
          <input
            type='text'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='input'
            placeholder='Email'
          />
        </label>

        <label className='form-label'>
          Name{' '}
          <input
            type='text'
            required
            value={displayName}
            onChange={(e) => setdisplayName(e.target.value)}
            className='input'
            placeholder='Name'
          />
        </label>
        <label className='form-label'>
          Phone Number{' '}
          <input
            type='number'
            required
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className='input'
            placeholder='Phone number'
          />
        </label>
        <div className='change-button'>
          <button disabled={loading} onClick={handleSubmit}>
            {loading ? <CircularIndeterminate /> : 'Change'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default withRouter(EditUser)
