import * as React from 'react'
import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import ResponsiveDrawer from '../components/sidebar'
import '../style/user.css'
import axios from 'axios'
import PositionedMenu from '../components/ActiveDropdown'
import PageLoader from '../components/pageloader'
import OrderDropdown from '../components/OrderDropdown'

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
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState([])

  useEffect(() => {
    setLoading(true)
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get('https://kidsio.herokuapp.com/orders/', { headers: headers })
      .then((res) => {
        setLoading(false)
        console.log(res.data.orders)
        setOrder(res.data.orders)
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
                <StyledTableCell>User Email</StyledTableCell>
                <StyledTableCell align='left'>Created At</StyledTableCell>
                <StyledTableCell align='left'>Is Admin</StyledTableCell>
                <StyledTableCell align='left'>Action</StyledTableCell>
                <StyledTableCell align='left'>Action</StyledTableCell>
                <StyledTableCell align='left'>Action</StyledTableCell>
                <StyledTableCell align='left'>Action</StyledTableCell>
                <StyledTableCell align='left'>Action</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {order.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell>
                    {row.orderItems === []
                      ? null
                      : row.orderItems.map((item) => {
                          return (
                            <>
                              <StyledTableCell key={item._id}>
                                {item.name}
                              </StyledTableCell>
                              <br />
                            </>
                          )
                        })}
                  </StyledTableCell>

                  <StyledTableCell align='left'>
                    {row.orderItems === [] ? null : row.orderItems.length ===
                      0 ? (
                      <StyledTableCell key={item._id} align='left'>
                        {item.price}
                      </StyledTableCell>
                    ) : (
                      row.orderItems.map((item) => {
                        return (
                          <>
                            <StyledTableCell key={item._id} align='left'>
                              {item.price}
                            </StyledTableCell>
                            <br />
                          </>
                        )
                      })
                    )}
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

                  <StyledTableCell align='left'>
                    <OrderDropdown id={row._id} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ResponsiveDrawer>
    </div>
  )
}

export default Orders
