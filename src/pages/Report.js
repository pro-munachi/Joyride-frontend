import { React, useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import axios from 'axios'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import TablePagination from '@mui/material/TablePagination'
import Moment from 'react-moment'

import ResponsiveDrawer from '../components/sidebar'
import '../style/report.css'
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

const Report = () => {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [order, setOrder] = useState([])
  //   const [page, setPage] = React.useState(0)
  //   const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    const data = {
      startDate: start,
      endDate: end,
    }

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }

    axios
      .post('http://kidsio.herokuapp.com/admin/report', data, {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data)
        setOrder(res.data.all)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //   const handleChangePage = (event, newPage) => {
  //     setPage(newPage)
  //   }

  //   const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(parseInt(event.target.value, 10))
  //     setPage(0)
  //   }

  return (
    <ResponsiveDrawer>
      <div className='report-container'>
        <div className='date'>
          <form>
            <label>
              {' '}
              Start Date
              <input
                type='date'
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </label>
            <label>
              {' '}
              End Date
              <input
                type='date'
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </label>
            <div>
              <button type='button' onClick={handleSubmit}>
                Search
              </button>
            </div>
          </form>
        </div>
        <div>
          {loading ? (
            <PageLoader />
          ) : (
            <TableContainer
              component={Box}
              sx={{ maxWidth: '100%', overflowX: 'scroll' }}
            >
              <Table
                sx={{ maxWidth: '100%', overflowX: 'scroll' }}
                aria-label='customized table'
              >
                {order.length === 0 ? null : (
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align='left'>Phone</StyledTableCell>
                      <StyledTableCell align='left'>From</StyledTableCell>
                      <StyledTableCell align='left'>To</StyledTableCell>
                      <StyledTableCell align='left'>Time</StyledTableCell>
                      <StyledTableCell align='left'>
                        Is Delivered?
                      </StyledTableCell>
                      <StyledTableCell align='left'>Price</StyledTableCell>
                      <StyledTableCell align='left'></StyledTableCell>
                    </TableRow>
                  </TableHead>
                )}
                <TableBody>
                  {order
                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                          {row.totalPrice}
                        </StyledTableCell>

                        <StyledTableCell align='left'>
                          <OrderDropdown id={row._id} />{' '}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
              {/* <TablePagination
                component='div'
                count={order.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className='table'
              /> */}
            </TableContainer>
          )}
        </div>
      </div>
    </ResponsiveDrawer>
  )
}

export default withRouter(Report)
