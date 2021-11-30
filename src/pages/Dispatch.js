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
import PageLoader from '../components/pageloader'
import Moment from 'react-moment'
import '../style/dispatch.css'
import DispatchMenu from '../components/DispatchDropdown'
import ActivateMenu from '../components/InactiveDropdown'
import Mode from '../components/modals'
import CreateDispatcher from './CreateDispatcher'

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

const Dispatch = () => {
  const [dispatcher, setDispatcher] = useState([])
  const [inactive, setInactive] = useState([])
  const [filteredActive, setFilteredActive] = useState([])
  const [filteredInactive, setFilteredInactive] = useState([])
  const [dispatch, setDispatch] = useState(true)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [inactiveSearch, setInactiveSearch] = useState('')

  useEffect(() => {
    setLoading(true)
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }

    axios
      .get('https://joyrideapp.herokuapp.com/dispatch/active', {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data)
        let rev = res.data.dispatcher
        setDispatcher(rev)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(true)
      })

    axios
      .get('https://joyrideapp.herokuapp.com/dispatch/inactive', {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data)
        let rev = res.data.dispatcher
        setInactive(rev)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(true)
      })
  }, [])

  const activeReload = () => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }

    axios
      .get('https://joyrideapp.herokuapp.com/dispatch/active', {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data)
        let rev = res.data.dispatcher
        setDispatcher(rev)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(true)
      })

    axios
      .get('https://joyrideapp.herokuapp.com/dispatch/inactive', {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data)
        let rev = res.data.dispatcher
        setInactive(rev)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(true)
      })
  }

  const inactiveReload = () => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get('https://joyrideapp.herokuapp.com/dispatch/inactive', {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data)
        let rev = res.data.dispatcher
        setInactive(rev)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(true)
      })

    axios
      .get('https://joyrideapp.herokuapp.com/dispatch/active', {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data)
        let rev = res.data.dispatcher
        setDispatcher(rev)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(true)
      })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const searchHandler = (e) => {
    setSearch(e.target.value)

    localStorage.setItem('search', e.target.value)

    console.log(localStorage.getItem('search'))

    const filteredData = dispatcher.filter((value) => {
      const searchStr = localStorage.getItem('search').toLowerCase()
      const name = value.displayName.toLowerCase().includes(searchStr)
      const phoneNumber = value.phoneNumber.toString().includes(searchStr)
      const idNumber = value.idNumber.toString().includes(searchStr)
      const bikeNumber = value.bikeNumber.toString().includes(searchStr)

      return name || phoneNumber || idNumber || bikeNumber
    })
    setFilteredActive(filteredData)
    if (search === '' || search.length === 0) {
      setFilteredActive(dispatcher)
    }
  }

  const inactiveSearchHandler = (e) => {
    setInactiveSearch(e.target.value)

    const filteredData = inactive.filter((value) => {
      const searchStr = inactiveSearch.toLowerCase()
      const name = value.displayName.toLowerCase().includes(searchStr)
      const phoneNumber = value.phoneNumber.toString().includes(searchStr)
      const idNumber = value.idNumber.toString().includes(searchStr)
      const bikeNumber = value.bikeNumber.toString().includes(searchStr)

      return name || phoneNumber || idNumber || bikeNumber
    })
    setFilteredInactive(filteredData)
  }

  return (
    <div className='user'>
      <ResponsiveDrawer>
        {' '}
        {loading ? (
          <PageLoader />
        ) : (
          <div className='dispatch'>
            <div className='create'>
              <Mode
                head={'Create Dispatcher'}
                text={'Create'}
                secondaryText={'Fill in the details of the dispatcher'}
                background={'#05386b'}
              >
                <CreateDispatcher />
              </Mode>
            </div>
            <div className='contain'>
              <div className='toggle-button-cover'>
                <div className='button-cover'></div>
                <div className='toggle-button-cover'>
                  <div className='button-cover'>
                    <div className='button b2' id='button-11'>
                      <input
                        type='checkbox'
                        className='checkbox'
                        onClick={() => setDispatch(!dispatch)}
                      />
                      <div className='knobs'>
                        <span></span>
                      </div>
                      <div className='layer'></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='head'>
                {dispatch ? (
                  <h2>Active Dispatchers</h2>
                ) : (
                  <h2 style={{ color: 'red' }}>Suspended Dispatchers</h2>
                )}
              </div>
              <div className='search'>
                <form>
                  {dispatch ? (
                    <input
                      type='text'
                      placeholder='Search Dispatcher'
                      value={search}
                      onChange={(e) => searchHandler(e)}
                    />
                  ) : (
                    <input
                      type='text'
                      placeholder='Search Dispatcher'
                      value={inactiveSearch}
                      onChange={(e) => inactiveSearchHandler(e)}
                      style={{ border: '2px solid red' }}
                    />
                  )}
                </form>
              </div>
            </div>
            {dispatch ? (
              <>
                {!filteredActive || filteredActive.length === 0 ? (
                  <TableContainer component={Paper}>
                    <Table aria-label='customized table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Dispatcher</StyledTableCell>
                          <StyledTableCell align='left'>
                            Id Number
                          </StyledTableCell>
                          <StyledTableCell align='left'>
                            Phone Number
                          </StyledTableCell>
                          <StyledTableCell align='left'>
                            Created At
                          </StyledTableCell>
                          <StyledTableCell align='left'>
                            Bike Number
                          </StyledTableCell>
                          <StyledTableCell align='left'>Action</StyledTableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {dispatcher
                          .map((row) => (
                            <StyledTableRow key={row._id} className='green'>
                              <StyledTableCell component='th' scope='row'>
                                {row.displayName}
                              </StyledTableCell>
                              <StyledTableCell align='left'>
                                {row.idNumber}
                              </StyledTableCell>
                              <StyledTableCell align='left'>
                                {row.phoneNumber}
                              </StyledTableCell>
                              <StyledTableCell align='left'>
                                <Moment format='D MMM YYYY' withTitle>
                                  {row.createdAt}
                                </Moment>
                              </StyledTableCell>

                              <StyledTableCell align='left'>
                                {row.bikeNumber}
                              </StyledTableCell>

                              <StyledTableCell align='left' typeof='button'>
                                <DispatchMenu
                                  id={row._id}
                                  refresh={activeReload}
                                />
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
                      count={dispatcher.length}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      className='table'
                    />
                  </TableContainer>
                ) : (
                  <TableContainer component={Paper}>
                    <Table aria-label='customized table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Dispatcher</StyledTableCell>
                          <StyledTableCell align='left'>
                            Id Number
                          </StyledTableCell>
                          <StyledTableCell align='left'>
                            Phone Number
                          </StyledTableCell>
                          <StyledTableCell align='left'>
                            Created At
                          </StyledTableCell>
                          <StyledTableCell align='left'>
                            Bike Number
                          </StyledTableCell>
                          <StyledTableCell align='left'>Action</StyledTableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {filteredActive
                          .map((row) => (
                            <StyledTableRow key={row._id} className='green'>
                              <StyledTableCell component='th' scope='row'>
                                {row.displayName}
                              </StyledTableCell>
                              <StyledTableCell align='left'>
                                {row.idNumber}
                              </StyledTableCell>
                              <StyledTableCell align='left'>
                                {row.phoneNumber}
                              </StyledTableCell>
                              <StyledTableCell align='left'>
                                <Moment format='D MMM YYYY' withTitle>
                                  {row.createdAt}
                                </Moment>
                              </StyledTableCell>

                              <StyledTableCell align='left'>
                                {row.bikeNumber}
                              </StyledTableCell>

                              <StyledTableCell align='left' typeof='button'>
                                <DispatchMenu
                                  id={row._id}
                                  refresh={activeReload}
                                />
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
                      count={filteredActive.length}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      className='table'
                    />
                  </TableContainer>
                )}
              </>
            ) : (
              <>
                {!filteredInactive || filteredInactive.length === 0 ? (
                  <TableContainer component={Paper}>
                    <Table aria-label='customized table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Dispatcher</StyledTableCell>
                          <StyledTableCell align='left'>
                            Id Number
                          </StyledTableCell>
                          <StyledTableCell align='left'>
                            Phone Number
                          </StyledTableCell>
                          <StyledTableCell align='left'>
                            Created At
                          </StyledTableCell>
                          <StyledTableCell align='left'>
                            Bike Number
                          </StyledTableCell>
                          <StyledTableCell align='left'>Action</StyledTableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {inactive
                          .map((row) => (
                            <StyledTableRow key={row._id} className='red'>
                              <StyledTableCell component='th' scope='row'>
                                {row.displayName}
                              </StyledTableCell>
                              <StyledTableCell align='left'>
                                {row.idNumber}
                              </StyledTableCell>
                              <StyledTableCell align='left'>
                                {row.phoneNumber}
                              </StyledTableCell>
                              <StyledTableCell align='left'>
                                <Moment format='D MMM YYYY' withTitle>
                                  {row.createdAt}
                                </Moment>
                              </StyledTableCell>

                              <StyledTableCell align='left'>
                                {row.bikeNumber}
                              </StyledTableCell>

                              <StyledTableCell align='left' typeof='button'>
                                <ActivateMenu
                                  id={row._id}
                                  refresh={inactiveReload}
                                />
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
                      count={inactive.length}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      className='table'
                    />
                  </TableContainer>
                ) : (
                  <TableContainer component={Paper}>
                    <Table aria-label='customized table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Dispatcher</StyledTableCell>
                          <StyledTableCell align='left'>
                            Id Number
                          </StyledTableCell>
                          <StyledTableCell align='left'>
                            Phone Number
                          </StyledTableCell>
                          <StyledTableCell align='left'>
                            Created At
                          </StyledTableCell>
                          <StyledTableCell align='left'>
                            Bike Number
                          </StyledTableCell>
                          <StyledTableCell align='left'>Action</StyledTableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {filteredInactive
                          .map((row) => (
                            <StyledTableRow key={row._id} className='red'>
                              <StyledTableCell component='th' scope='row'>
                                {row.displayName}
                              </StyledTableCell>
                              <StyledTableCell align='left'>
                                {row.idNumber}
                              </StyledTableCell>
                              <StyledTableCell align='left'>
                                {row.phoneNumber}
                              </StyledTableCell>
                              <StyledTableCell align='left'>
                                <Moment format='D MMM YYYY' withTitle>
                                  {row.createdAt}
                                </Moment>
                              </StyledTableCell>

                              <StyledTableCell align='left'>
                                {row.bikeNumber}
                              </StyledTableCell>

                              <StyledTableCell align='left' typeof='button'>
                                <ActivateMenu
                                  id={row._id}
                                  refresh={inactiveReload}
                                />
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
                      count={filteredInactive.length}
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
          </div>
        )}
      </ResponsiveDrawer>
    </div>
  )
}

export default withRouter(Dispatch)
