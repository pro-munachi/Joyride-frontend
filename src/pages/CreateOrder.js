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
        setPrice('')
        setName('')
        setShippingPrice('')
        setTaxPrice('')
        setAddressFrom('')
        setAddressTo('')
        setPaymentMethod('')
        toast.success('Your order has been created successfully')
      })
      .catch((err) => {
        setLoading(false)
        toast.error('sorry something went wrong')
      })
  }

  return (
    <div className='form-containers'>
      <form onSubmit={handleSubmit}>
        <h2>Create Orders</h2>
        <label>
          Address From
          <input
            type='text'
            required
            value={addressFrom}
            onChange={(e) => setAddressFrom(e.target.value)}
            placeholder='Address From'
          />
        </label>
        <label>
          Address To
          <input
            type='text'
            required
            value={addressTo}
            onChange={(e) => setAddressTo(e.target.value)}
            placeholder='Address To'
          />
        </label>
        <label>
          Payment Method
          <input
            type='text'
            required
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            placeholder='Payment Method'
          />
        </label>
        <label>
          Name
          <input
            type='text'
            required
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Price
          <input
            type='number'
            required
            placeholder='Price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <button onClick={onclick} className='add-order'>
          Add
        </button>
        <label>
          Shipping Price
          <input
            type='number'
            required
            value={shippingPrice}
            onChange={(e) => setShippingPrice(e.target.value)}
            placeholder='Shipping Price'
          />
        </label>
        <label>
          Tax Price
          <input
            type='number'
            required
            value={taxPrice}
            onChange={(e) => setTaxPrice(e.target.value)}
            placeholder='Tax Price'
          />
        </label>

        <ToastContainer />
        <div>
          <button disabled={loading}>
            {loading ? <CircularIndeterminate /> : 'Create Order'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateOrder
