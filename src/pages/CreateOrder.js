import axios from 'axios'
import { React, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
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
  const [add, setAdd] = useState(false)
  const [allItems, setAllItems] = useState([])

  const onclick = () => {
    let item = {
      name: name,
      price: parseInt(price),
    }

    setAllItems([...allItems, item])

    console.log(item)
    console.log(allItems)
  }

  let totalPrice = allItems.reduce(function (acc, curr) {
    return acc + curr.price
  }, 0)

  const changeClick = () => {
    setAdd(!add)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    onclick()

    const data = {
      addressFrom: addressFrom,
      addressTo: addressTo,
      paymentMethod: paymentMethod,
      shippingPrice: shippingPrice,
      taxPrice: taxPrice,
      orderItems: allItems,
      totalPrice: totalPrice,
    }

    console.log(allItems)
    console.log(data)

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
        if (res.data.hasError === false) {
          setLoading(false)
          setPrice('')
          setName('')
          setShippingPrice('')
          setTaxPrice('')
          setAddressFrom('')
          setAddressTo('')
          setPaymentMethod('')
          toast.success('Your order has been created successfully')
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
    <div className='form-containers'>
      {add === true ? (
        <form>
          <h2>Add the orders you want to create</h2>
          <label>
            Order Name
            <input
              type='text'
              required
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Order Price
            <input
              type='number'
              required
              placeholder='Price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <div className='div1'>
            <button type='button' onClick={changeClick}>
              Go back
            </button>
            <button className='button1' type='button' onClick={onclick}>
              Add Order
            </button>
          </div>
        </form>
      ) : (
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
            Order Name
            <input
              type='text'
              required
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Order Price
            <input
              type='number'
              required
              placeholder='Price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
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
          <div>
            <button disabled={loading}>
              {loading ? <CircularIndeterminate /> : 'Create Order'}
            </button>
            <button type='button' onClick={changeClick} className='button1'>
              Add Order
            </button>
          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  )
}

export default CreateOrder
