import * as React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TablePagination from '@mui/material/TablePagination'

import ResponsiveDrawer from '../components/sidebar'
import '../style/user.css'
// import PositionedMenu from '../components/ActiveDropdown'
// import PageLoader from '../components/pageloader'
import OrderDropdown from '../components/OrderDropdown'
import { useParams } from 'react-router'

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

const Orders = () => {
  const [order, setOrder] = useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const { id } = useParams()

  console.log(id)

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get(`https://kidsio.herokuapp.com/orders/${id}`, { headers: headers })
      .then((res) => {
        console.log(res.data)
        setOrder(res.data.order)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className='user'>
      <ResponsiveDrawer>
        {' '}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Order Name</StyledTableCell>
                <StyledTableCell align='left'>Order Price</StyledTableCell>
                <StyledTableCell align='left'>Address From</StyledTableCell>
                <StyledTableCell align='left'>Address To</StyledTableCell>
                <StyledTableCell align='left'>Time Of Order</StyledTableCell>
                <StyledTableCell align='left'>
                  Is Order Delivered?
                </StyledTableCell>
                <StyledTableCell align='left'>Is Order Paid?</StyledTableCell>
                <StyledTableCell align='left'>Is Order Paid?</StyledTableCell>
                <StyledTableCell align='left'>Total Price</StyledTableCell>
                <StyledTableCell align='left'>Payment Method</StyledTableCell>
                <StyledTableCell align='left'>Tax Price</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <StyledTableRow key={order._id}>
                <StyledTableCell>
                  {/* {order.orderItems === []
                    ? null
                    : order.orderItems.map((item) => {
                        return (
                          <StyledTableCell key={item._id} align='left'>
                            {item.price}
                          </StyledTableCell>
                        )
                      })} */}
                </StyledTableCell>

                <StyledTableCell align='left'>
                  {/* {order.orderItems === []
                    ? null
                    : order.orderItems.map((item) => {
                        return (
                          <StyledTableCell key={item._id} align='left'>
                            {item.price}
                          </StyledTableCell>
                        )
                      })} */}
                </StyledTableCell>

                <StyledTableCell align='left'>
                  {order.addressFrom}
                </StyledTableCell>
                <StyledTableCell align='left'>
                  {order.addressTo}
                </StyledTableCell>

                <StyledTableCell align='left'>
                  {order.createdAt}
                </StyledTableCell>

                <StyledTableCell align='left'>
                  {order.dispatchOrder ? 'Delivered' : 'Not delivered'}
                </StyledTableCell>

                <StyledTableCell align='left'>
                  {order.ispaid ? 'Paid' : 'Not Paid'}
                </StyledTableCell>

                <StyledTableCell align='left'>
                  {order.dispatchOrder ? 'Dispatched' : 'Not Dispatched'}
                </StyledTableCell>

                <StyledTableCell align='left'>
                  {order.totalPrice}
                </StyledTableCell>

                <StyledTableCell align='left'>
                  {order.paymentMethod}
                </StyledTableCell>
                <StyledTableCell align='left'>{order.taxPrice}</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </ResponsiveDrawer>
    </div>
  )
}

export default Orders