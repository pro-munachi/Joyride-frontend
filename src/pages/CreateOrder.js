import axios from 'axios'
import { React, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { ToastContainer, toast } from 'react-toastify'

import '../style/createorder.css'
import CircularIndeterminate from '../components/loader'

const CreateOrder = () => {
  const [addressFrom, setAddressFrom] = useState('')
  const [addressTo, setAddressTo] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [shippingPrice, setShippingPrice] = useState('')
  const [taxPrice, setTaxPrice] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(false)

  let items = []

  const onclick = () => {
    items.push({
      name: name,
      price: price,
    })

    console.log(items)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      addressFrom: addressFrom,
      addressTo: addressTo,
      paymentMethod: paymentMethod,
      shippingPrice: shippingPrice,
      taxPrice: taxPrice,
      orderItems: items,
    }

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    setLoading(true)
    axios
      .post('http://kidsio.herokuapp.com/orders/orderProducts', data, {
        headers: headers,
      })
      .then((res) => {
        setLoading(false)
        console.log(res.data)
      })
      .catch((err) => {
        setLoading(false)
        toast.error('sorry something went wrong')
      })

    console.log('muna')
  }

  return (
    <div className='containers'>
      <form className='forms' onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <label className='label'>
          Address From
          <input
            type='text'
            required
            value={addressFrom}
            onChange={(e) => setAddressFrom(e.target.value)}
            className='input'
            placeholder='Address From'
          />
        </label>
        <label className='label'>
          Address To
          <input
            type='text'
            required
            value={addressTo}
            onChange={(e) => setAddressTo(e.target.value)}
            className='input'
            placeholder='Address To'
          />
        </label>
        <label className='label'>
          Payment Method
          <input
            type='text'
            required
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className='input'
            placeholder='Payment Method'
          />
        </label>
        <label className='label'>
          Name
          <input
            type='text'
            required
            className='input'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className='label'>
          Price
          <input
            type='number'
            required
            className='input'
            placeholder='Price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <button onClick={onclick}>Add</button>
        <label className='label'>
          Shipping Price
          <input
            type='number'
            required
            value={shippingPrice}
            onChange={(e) => setShippingPrice(e.target.value)}
            className='input'
            placeholder='Shipping Price'
          />
        </label>
        <label className='label'>
          Tax Price
          <input
            type='number'
            required
            value={taxPrice}
            onChange={(e) => setTaxPrice(e.target.value)}
            className='input'
            placeholder='Tax Price'
          />
        </label>

        <ToastContainer />
        <div className='write'>div</div>

        <div>
          <button className='button' disabled={loading}>
            {loading ? <CircularIndeterminate /> : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateOrder
