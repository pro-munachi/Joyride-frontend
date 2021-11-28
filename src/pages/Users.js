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
import TablePagination from '@mui/material/TablePagination'
import { withRouter } from 'react-router'

import ResponsiveDrawer from '../components/sidebar'
import '../style/user.css'
import axios from 'axios'
import PositionedMenu from '../components/ActiveDropdown'
import PageLoader from '../components/pageloader'
import Illustration from '../components/Illustration/Illustration'
import empty from '../assets/svgs/empty.svg'
import errorsvg from '../assets/svgs/networkerror.svg'
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

const Users = () => {
  const [users, setUsers] = useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get('https://kidsio.herokuapp.com/users/', { headers: headers })
      .then((res) => {
        let rev = res.data.allUsers.reverse()
        setUsers(rev)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setError(true)
        setLoading(false)
      })
  }, [])

  const reload = () => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get('https://kidsio.herokuapp.com/users/', { headers: headers })
      .then((res) => {
        let rev = res.data.allUsers.reverse()
        setUsers(rev)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setError(true)
        setLoading(false)
      })
  }

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
        {' '}
        {loading ? (
          <PageLoader />
        ) : error ? (
          <Illustration
            svg={errorsvg}
            text={'Sorry cannot load the page at the moment'}
            height={'30%'}
            width={'30%'}
          />
        ) : (
          <>
            {' '}
            {!users || users.length === 0 ? (
              <Illustration
                svg={empty}
                text={'There are no users at the moment'}
                height={'30%'}
                width={'30%'}
              />
            ) : (
              <TableContainer component={Paper}>
                <Table aria-label='customized table'>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>User Email</StyledTableCell>
                      <StyledTableCell align='left'>
                        Display Name
                      </StyledTableCell>
                      <StyledTableCell align='left'>Created At</StyledTableCell>
                      <StyledTableCell align='left'>Is Admin</StyledTableCell>
                      <StyledTableCell align='left'>Action</StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {users
                      .map((row) => (
                        <StyledTableRow key={row._id}>
                          <StyledTableCell component='th' scope='row'>
                            {row.email}
                          </StyledTableCell>
                          <StyledTableCell align='left'>
                            {row.displayName}
                          </StyledTableCell>
                          <StyledTableCell align='left'>
                            <Moment format='D MMM YYYY' withTitle>
                              {row.createdAt}
                            </Moment>
                          </StyledTableCell>
                          {row.isAdmin ? (
                            <StyledTableCell align='left'>Yes</StyledTableCell>
                          ) : (
                            <StyledTableCell align='left'>No</StyledTableCell>
                          )}

                          <StyledTableCell align='left' typeof='button'>
                            <PositionedMenu id={row._id} refresh={reload} />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )}
                  </TableBody>
                </Table>
                <TablePagination
                  component='div'
                  count={users.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  className='table'
                />
              </TableContainer>
            )}
          </>
        )}
      </ResponsiveDrawer>
    </div>
  )
}

export default withRouter(Users)
