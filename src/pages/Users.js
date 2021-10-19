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
// import PageLoader from '../components/pageloader'

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

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get('https://kidsio.herokuapp.com/users/', { headers: headers })
      .then((res) => {
        console.log(res.data)
        setUsers(res.data)
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
                <StyledTableCell align='left'>Display Name</StyledTableCell>
                <StyledTableCell align='left'>Created At</StyledTableCell>
                <StyledTableCell align='left'>Is Admin</StyledTableCell>
                <StyledTableCell align='left'>Action</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component='th' scope='row'>
                    {row.email}
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    {row.displayName}
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    {row.createdAt}
                  </StyledTableCell>
                  {row.isAdmin ? (
                    <StyledTableCell align='left'>Yes</StyledTableCell>
                  ) : (
                    <StyledTableCell align='left'>No</StyledTableCell>
                  )}

                  <StyledTableCell align='left' typeof='button'>
                    <PositionedMenu id={row._id} />
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

export default Users
