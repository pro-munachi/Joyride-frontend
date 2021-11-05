import axios from 'axios'
import { React, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import ResponsiveDrawer from '../components/sidebar'

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
  const [allItems, setAllItems] = useState([{ name: '', price: 0 }])

  const onclick = () => {
    let item = {
      name: name,
      price: parseInt(price),
    }
    let items = JSON.parse(localStorage.getItem('order'))
    console.log(items)
    if (items) {
      items.push(item)
      localStorage.setItem('order', JSON.stringify(items))
      console.log('work')
    } else {
      localStorage.setItem('order', JSON.stringify([item]))
      console.log('wor')
    }
    console.log(JSON.parse(localStorage.getItem('order')))

    toast.success('Item has been added successfully')
  }

  const deleteItem = (name) => {
    let items = JSON.parse(localStorage.getItem('order'))
    var item = items.filter(function (el) {
      return el.name !== name
    })
    localStorage.setItem('order', JSON.stringify(item))

    toast.error('Item has been removed successfully')
  }

  let totalPrice = 0

  if (JSON.parse(localStorage.getItem('order')).length === 0) {
    totalPrice += 0
  } else {
    totalPrice = JSON.parse(localStorage.getItem('order')).reduce(function (
      acc,
      curr
    ) {
      return acc + curr.price
    },
    0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let orderItems = JSON.parse(localStorage.getItem('order'))

    const data = {
      addressFrom: addressFrom,
      addressTo: addressTo,
      paymentMethod: paymentMethod,
      shippingPrice: shippingPrice,
      taxPrice: taxPrice,
      orderItems: orderItems,
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
      .post('http://kidsio.herokuapp.com/orders/orderProduct', data, {
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
    <ResponsiveDrawer>
      <div className='forms'>
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
            </div>
          </form>

          <ToastContainer />
        </div>
        <div className='form-container2'>
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
              <button className='button1' type='button' onClick={onclick}>
                Add Order
              </button>
            </div>
            <div className='box'>
              {' '}
              {JSON.parse(localStorage.getItem('order')).length === 0 ? (
                <div style={{ margin: '12px auto' }}>No order Yet</div>
              ) : (
                JSON.parse(localStorage.getItem('order')).map((single) => (
                  <Stack
                    direction='row'
                    spacing={1}
                    key={single.name}
                    sx={{ margin: '3px 7px' }}
                  >
                    <Chip
                      label={single.name}
                      onDelete={() => deleteItem(single.name)}
                    />
                  </Stack>
                ))
              )}
            </div>
          </form>
        </div>
      </div>
    </ResponsiveDrawer>
  )
}

export default CreateOrder
