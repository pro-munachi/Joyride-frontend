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
import { withRouter } from 'react-router'

import ResponsiveDrawer from '../components/sidebar'
import '../style/user.css'
// import PositionedMenu from '../components/ActiveDropdown'
import PageLoader from '../components/pageloader'
import { useParams } from 'react-router'
import ViewUser from './ViewUser'

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
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  console.log(id)

  useEffect(() => {
    setLoading(true)
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get(`https://kidsio.herokuapp.com/orders/${id}`, { headers: headers })
      .then((res) => {
        console.log(res.data.order)
        setOrder(res.data.order)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [id])

  return (
    <div className='user'>
      <ResponsiveDrawer>
        {' '}
        {loading ? (
          <PageLoader />
        ) : (
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
                  <StyledTableCell align='left'>
                    {order.totalPrice}
                  </StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {order.orderItems.map((item) => (
                  <StyledTableRow key={item._id}>
                    <StyledTableCell>{item.name}</StyledTableCell>

                    <StyledTableCell align='left'>
                      {order.totalPrice}
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
                    <StyledTableCell align='left'>
                      {order.taxPrice}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </ResponsiveDrawer>
    </div>
  )
}

export default withRouter(Orders)
