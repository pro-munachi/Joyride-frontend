import axios from 'axios'
import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ResponsiveDrawer from '../components/sidebar'
import '../style/viewuser.css'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const ViewUser = () => {
  const [user, setUser] = useState([])
  const [order, setOrder] = useState([])

  let { id } = useParams()
  console.log(id)

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get(`https://kidsio.herokuapp.com/users/${id}`, { headers: headers })
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get(`https://kidsio.herokuapp.com/orders/user/${id}`, {
        headers: headers,
      })
      .then((res) => {
        if (res.data.hasError === false) {
          setOrder(res.data.slice)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

  const adminHandler = () => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get(`https://kidsio.herokuapp.com/users/admin/${id}`, {
        headers: headers,
      })
      .then((res) => {
        if (res.data.hasError === false) {
          toast.success('User has been made an admin')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <ResponsiveDrawer>
      {' '}
      <div className='user-container'>
        <div className='user-profile'>
          <div className='h2'>{user.displayName}'s Profile</div>
          <div className='user-contact'>
            <div className='user-image'>
              <img src={user.profilePic} alt='user' />
            </div>
            <div className='empty' />
            <div className='user-details'>
              <div>
                Display Name: <span>{user.displayName}</span>
              </div>
              <p>
                Email: <span>{user.email}</span>
              </p>
              <p>
                Is Admin: <span>{user.isAdmin ? 'True' : 'False'}</span>
              </p>
              <p>
                Created At: <span>{user.createdAt}</span>
              </p>
              {user.isAdmin ? null : (
                <button onClick={adminHandler} className='view-button'>
                  Make Admin
                </button>
              )}
            </div>
          </div>
        </div>
        <Divider />
        <div className='user-orders'>
          <div className='h2'>{user.displayName}'s Latest Orders</div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Order Name</StyledTableCell>
                  <StyledTableCell align='left'>Order Price</StyledTableCell>
                  <StyledTableCell align='left'>Address From</StyledTableCell>
                  <StyledTableCell align='left'>Address To</StyledTableCell>
                  <StyledTableCell align='left'>Created At</StyledTableCell>
                  <StyledTableCell align='left'>
                    Dispatched Order
                  </StyledTableCell>
                  <StyledTableCell align='left'>Total Price</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {order.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell>
                      {row.orderItems === []
                        ? null
                        : row.orderItems.length === 1
                        ? row.orderItems.map((item) => {
                            return (
                              <StyledTableCell key={item._id} align='left'>
                                {item.name}
                              </StyledTableCell>
                            )
                          })
                        : row.orderItems.map((item) => {
                            return (
                              <StyledTableCell key={item._id} align='left'>
                                {item.name}
                              </StyledTableCell>
                            )
                          })}
                    </StyledTableCell>

                    <StyledTableCell align='left'>
                      {row.orderItems === []
                        ? null
                        : row.orderItems.map((item) => {
                            return (
                              <StyledTableCell key={item._id} align='left'>
                                {item.price}
                              </StyledTableCell>
                            )
                          })}
                    </StyledTableCell>

                    <StyledTableCell align='left'>
                      {row.addressFrom}
                    </StyledTableCell>
                    <StyledTableCell align='left'>
                      {row.addressTo}
                    </StyledTableCell>

                    <StyledTableCell align='left'>
                      {row.createdAt}
                    </StyledTableCell>

                    <StyledTableCell align='left'>
                      {row.dispatchOrder ? 'True' : 'False'}
                    </StyledTableCell>

                    <StyledTableCell align='left'>
                      {row.totalPrice}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <ToastContainer />
    </ResponsiveDrawer>
  )
}

export default ViewUser
