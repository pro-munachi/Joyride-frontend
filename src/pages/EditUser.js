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
  const [displayName, setdisplayName] = useState(localStorage.getItem('name'))
  const [number, setNumber] = useState(localStorage.getItem('phone'))
  const [email, setEmail] = useState(localStorage.getItem('email'))
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
      .post('http://joyrideapp.herokuapp.com/users/edit', data, {
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
    <div className='modal-container'>
      <form className='formal'>
        <label className='form-label'>
          Email
          <input
            type='text'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='input'
            placeholder={localStorage.getItem('email')}
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
            placeholder={localStorage.getItem('name')}
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
            placeholder={localStorage.getItem('phone')}
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
