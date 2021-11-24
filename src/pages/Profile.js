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

const Profile = () => {
  const [user, setUser] = useState([])
  const [order, setOrder] = useState([])
  const [loading, setLoading] = useState(false)

  const id = localStorage.getItem('id')

  useEffect(() => {
    setLoading(true)
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get(`https://kidsio.herokuapp.com/orders/user/${id}`, {
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

  return (
    <div>
      <ResponsiveDrawer>
        {' '}
        {loading ? (
          <PageLoader />
        ) : (
          <div className='user-container'>
            <div className='user-profile'>
              <div className='h2'>{localStorage.getItem('name')}'s Profile</div>
              <div className='user-contact'>
                <div className='user-image'>
                  <img src={localStorage.getItem('pic')} alt='user' />
                </div>
                <div className='empty' />
                <div className='user-details'>
                  <div>
                    Display Name: <span>{localStorage.getItem('name')}</span>
                  </div>
                  <p>
                    Email: <span>{localStorage.getItem('email')}</span>
                  </p>
                  <p>
                    Number: <span>{localStorage.getItem('phone')}</span>
                  </p>
                  <p>
                    Is Admin:{' '}
                    <span>
                      {localStorage.getItem('admin') ? 'True' : 'False'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <Divider />
            <div className='user-orders'>
              <div className='h2'>
                {localStorage.getItem('name')}'s Latest Orders
              </div>

              <TableContainer component={Paper}>
                <Table
                  sx={{ maxWidth: '100%', overflowX: 'scroll' }}
                  aria-label='customized table'
                >
                  <TableHead sx={{ background: '#05386b' }}>
                    <TableRow sx={{ background: '#05386b' }}>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align='left'>
                        Address From
                      </StyledTableCell>
                      <StyledTableCell align='left'>Address To</StyledTableCell>
                      <StyledTableCell align='left'>Created At</StyledTableCell>
                      <StyledTableCell align='left'>Delivered</StyledTableCell>
                      <StyledTableCell align='left'>Dispatched</StyledTableCell>
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
                        <StyledTableCell>{row.userName}</StyledTableCell>

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
                          {row.isDelivered ? 'True' : 'False'}
                        </StyledTableCell>

                        <StyledTableCell align='left'>
                          {row.dispatchOrder ? 'True' : 'False'}
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
            </div>
          </div>
        )}
      </ResponsiveDrawer>
    </div>
  )
}

export default withRouter(Profile)
