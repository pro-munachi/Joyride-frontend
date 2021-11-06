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
import Moment from 'react-moment'

import ResponsiveDrawer from '../components/sidebar'
import '../style/user.css'
// import PositionedMenu from '../components/ActiveDropdown'
// import PageLoader from '../components/pageloader'
import OrderDropdown from '../components/OrderDropdown'
import PageLoader from '../components/pageloader'

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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get('https://kidsio.herokuapp.com/orders/', { headers: headers })
      .then((res) => {
        const ord = res.data.orders.reverse()
        setOrder(ord)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div className='user'>
      <ResponsiveDrawer>
        {loading ? (
          <PageLoader />
        ) : (
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 700, overflowX: 'scroll' }}
              aria-label='customized table'
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align='left'>Number</StyledTableCell>
                  <StyledTableCell align='left'>From</StyledTableCell>
                  <StyledTableCell align='left'>To</StyledTableCell>
                  <StyledTableCell align='left'>Time</StyledTableCell>
                  <StyledTableCell align='left'>Is Delivered?</StyledTableCell>
                  <StyledTableCell align='left'>Price</StyledTableCell>
                  <StyledTableCell align='left'></StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {order
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell>{row.userName}</StyledTableCell>

                      <StyledTableCell align='left'>
                        {row.number}
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
                        {row.dispatchOrder ? 'True' : 'False'}
                      </StyledTableCell>

                      <StyledTableCell align='left'>
                        {row.totalPrice}.00
                      </StyledTableCell>

                      <StyledTableCell align='left'>
                        <OrderDropdown id={row._id} />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              component='div'
              count={order.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className='table'
            />
          </TableContainer>
        )}
      </ResponsiveDrawer>
    </div>
  )
}

export default Orders
