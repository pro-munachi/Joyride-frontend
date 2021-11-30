import axios from 'axios'
import { React, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { withRouter } from 'react-router'
import Alert from '@mui/material/Alert'

import ResponsiveDrawer from '../components/sidebar'
import '../style/createorder.css'
import CircularIndeterminate from '../components/loader'
import Illustration from '../components/Illustration/Illustration'
import empty from '../assets/svgs/empty.svg'

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
    toast.success('Item has been added successfully')
    setName('')
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

  const handleSubmit = (e) => {
    e.preventDefault()

    let orderItems = JSON.parse(localStorage.getItem('order'))

    const data = {
      addressFrom: addressFrom,
      addressTo: addressTo,
      paymentMethod: paymentMethod,
      orderItems: orderItems,
    }

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    setLoading(true)
    axios
      .post('http://joyrideapp.herokuapp.com/orders/orderProduct', data, {
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
      <div className='create-form'>
        <div className='shadow'>
          <div className='form-containers'>
            <form>
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
                Order Description
                <input
                  type='text'
                  required
                  placeholder='Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <div className='div1'>
                <button
                  className='button1'
                  type='button'
                  disabled={
                    name === null || name.length === 0 || name === undefined
                  }
                  onClick={onclick}
                >
                  Add
                </button>
              </div>
            </form>
            <div className='box'>
              {' '}
              {JSON.parse(!localStorage.getItem('order')) ||
              JSON.parse(localStorage.getItem('order')).length === 0 ? (
                <Illustration
                  svg={empty}
                  text={'No Item Selected'}
                  width={'100px'}
                  height={'80px'}
                />
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

          <div className='create'>
            <button disabled={loading} type='button' onClick={handleSubmit}>
              {loading ? <CircularIndeterminate /> : 'Create Order'}
            </button>
          </div>
        </div>
      </div>
    </ResponsiveDrawer>
  )
}

export default withRouter(CreateOrder)
