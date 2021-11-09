import axios from 'axios'
import { React, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { withRouter } from 'react-router'

import ResponsiveDrawer from '../components/sidebar'
import '../style/createorder.css'
import CircularIndeterminate from '../components/loader'
import { TextField, InputLabel } from '@mui/material'

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

    if (items) {
      items.push(item)
      localStorage.setItem('order', JSON.stringify(items))
      setAdd(!add)
    } else {
      localStorage.setItem('order', JSON.stringify([item]))
      setAdd(!add)
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
    setAdd(!add)

    toast.error('Item has been removed successfully')
  }

  // let totalPrice = 0

  // if (JSON.parse(localStorage.getItem('order')).length === 0) {
  //   totalPrice += 0
  // } else {
  //   totalPrice = JSON.parse(localStorage.getItem('order')).reduce(function (
  //     acc,
  //     curr
  //   ) {
  //     return acc + curr.price
  //   },
  //   0)
  // }

  const handleSubmit = (e) => {
    e.preventDefault()

    let orderItems = JSON.parse(localStorage.getItem('order'))

    const data = {
      addressFrom: addressFrom,
      addressTo: addressTo,
      paymentMethod: paymentMethod,
      orderItems: orderItems,
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
          </form>
        </div>
        <div className='form-container2'>
          <form>
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
            <div className='div1'>
              <button className='button1' type='button' onClick={onclick}>
                Add
              </button>
            </div>
          </form>
          <div className='box'>
            {' '}
            {JSON.parse(!localStorage.getItem('order')) ? (
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
        </div>
      </div>
      <div className='create'>
        <button disabled={loading}>
          {loading ? <CircularIndeterminate /> : 'Create Order'}
        </button>
      </div>
    </ResponsiveDrawer>
  )
}

export default withRouter(CreateOrder)
