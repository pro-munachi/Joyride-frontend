import axios from 'axios'
import { React, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'

import '../style/changepassword.css'
import CircularIndeterminate from '../components/loader'

const CreateDispatcher = () => {
  const [bikeNumber, setBikeNumber] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      displayName: displayName,
      phoneNumber: phoneNumber,
      bikeNumber: bikeNumber,
    }

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    setLoading(true)
    axios
      .post('http://kidsio.herokuapp.com/dispatch/create', data, {
        headers: headers,
      })
      .then((res) => {
        setLoading(false)
        if (res.data.hasError === false) {
          setDisplayName('')
          setPhoneNumber('')
          setBikeNumber('')
          toast.success('dispatcher successfully created')
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
          Bike Number
          <input
            type='text'
            required
            value={bikeNumber}
            onChange={(e) => setBikeNumber(e.target.value)}
            className='input'
            placeholder="Input dispatcher's bike number"
          />
        </label>

        <label className='form-label'>
          Name
          <input
            type='text'
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className='input'
            placeholder="Input dispatcher's name"
          />
        </label>
        <label className='form-label'>
          Phone Number{' '}
          <input
            type='number'
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className='input'
            placeholder="Input dispatcher's number"
          />
        </label>
        <div className='change-button'>
          <button disabled={loading} onClick={handleSubmit} type='button'>
            {loading ? <CircularIndeterminate /> : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateDispatcher
