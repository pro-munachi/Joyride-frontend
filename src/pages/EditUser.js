import axios from 'axios'
import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
// import { styled } from '@mui/material/styles'
// import Table from '@mui/material/Table'
// import TableBody from '@mui/material/TableBody'
// import TableCell, { tableCellClasses } from '@mui/material/TableCell'
// import TableContainer from '@mui/material/TableContainer'
// import TableHead from '@mui/material/TableHead'
// import TableRow from '@mui/material/TableRow'
// import Paper from '@mui/material/Paper'
// import VisibilityIcon from '@material-ui/icons/Visibility'
// import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { withRouter } from 'react-router'

import ResponsiveDrawer from '../components/sidebar'
import '../style/viewuser.css'

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }))

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }))

const EditUser = () => {
  const [user, setUser] = useState([])
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  // const [password] = useState('')
  // const [confirmPassword] = useState('')
  // const [loading, setLoading] = useState(false)
  // const [mode, setMode] = useState('password')

  let { id } = useParams()
  console.log(id)

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    axios
      .get(`https://kidsio.herokuapp.com/users/${id}`, { headers: headers })
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()

    // const data = {
    //   displayName: displayName,
    //   email: email,
    //   password: password,
    //   passwordCheck: confirmPassword,
    // }
  }

  return <ResponsiveDrawer>jhtfg</ResponsiveDrawer>
}

export default withRouter(EditUser)
