import axios from 'axios'
import { Fragment, React, useEffect, useState } from 'react'
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
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { withRouter } from 'react-router'

import ResponsiveDrawer from '../components/sidebar'
import '../style/viewuser.css'
import PageLoader from '../components/pageloader'
import Illustration from '../components/Illustration/Illustration'
import empty from '../assets/svgs/empty.svg'
import Moment from 'react-moment'

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
  const [loading, setLoading] = useState(false)

  let { id } = useParams()

  useEffect(() => {
    setLoading(true)
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get(`https://joyrideapp.herokuapp.com/users/${id}`, { headers: headers })
      .then((res) => {
        setUser(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [id])

  useEffect(() => {
    setLoading(true)
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get(`https://joyrideapp.herokuapp.com/orders/user/${id}`, {
        headers: headers,
      })
      .then((res) => {
        setLoading(false)
        if (res.data.hasError === false) {
          setOrder(res.data.slice)
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }, [id])

  const reload = () => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get(`https://joyrideapp.herokuapp.com/orders/user/${id}`, {
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
  }

  const adminHandler = () => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get(`https://joyrideapp.herokuapp.com/users/admin/${id}`, {
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

    reload()
  }

  return (
    <div>
      <ResponsiveDrawer>
        {' '}
        {loading ? (
          <PageLoader />
        ) : (
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
                    Number: <span>{user.phoneNumber}</span>
                  </p>
                  <p>
                    Is Admin: <span>{user.isAdmin ? 'True' : 'False'}</span>
                  </p>
                  <p>
                    Created At:{' '}
                    <span>
                      {' '}
                      <Moment format='D MMM YYYY' withTitle>
                        {user.createdAt}
                      </Moment>
                    </span>
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

              {!order || order.length === 0 ? (
                <Illustration
                  svg={empty}
                  text={'There is no existing order'}
                  height={'30%'}
                  width={'30%'}
                />
              ) : (
                <TableContainer component={Paper}>
                  <Table
                    sx={{ maxWidth: '100%', overflowX: 'scroll' }}
                    aria-label='customized table'
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Order Name</StyledTableCell>
                        <StyledTableCell align='left'>
                          Order Price
                        </StyledTableCell>
                        <StyledTableCell align='left'>
                          Address From
                        </StyledTableCell>
                        <StyledTableCell align='left'>
                          Address To
                        </StyledTableCell>
                        <StyledTableCell align='left'>
                          Created At
                        </StyledTableCell>
                        <StyledTableCell align='left'>
                          Delivered
                        </StyledTableCell>
                        <StyledTableCell align='left'>
                          Dispatched
                        </StyledTableCell>
                        <StyledTableCell align='left'>
                          Total Price
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order.map((row) => (
                        <StyledTableRow
                          key={row._id}
                          className={row.isDelivered ? 'green' : 'red'}
                        >
                          <StyledTableCell>
                            {row.orderItems.map((item) => {
                              return (
                                <Fragment key={item._id}>
                                  <> {item.name} </>
                                  <br />
                                </Fragment>
                              )
                            })}
                          </StyledTableCell>

                          <StyledTableCell align='left'>
                            {row.orderItems.map((item) => {
                              return (
                                <Fragment key={item._id}>
                                  <> {item.price} </>
                                  <br />
                                </Fragment>
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
                            <Moment format='D MMM YYYY' withTitle>
                              {row.createdAt}
                            </Moment>
                          </StyledTableCell>

                          <StyledTableCell align='left'>
                            {row.isDelivered ? 'Yes' : 'No'}
                          </StyledTableCell>

                          <StyledTableCell align='left'>
                            {row.dispatchOrder ? 'Yes' : 'No'}
                          </StyledTableCell>

                          <StyledTableCell align='left'>
                            &#8358;
                            {row.totalPrice
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          </div>
        )}
      </ResponsiveDrawer>
    </div>
  )
}

export default withRouter(ViewUser)
