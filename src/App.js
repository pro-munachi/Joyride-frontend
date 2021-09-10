import { useEffect, useState } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import PrimarySearchAppBar from './components/navbar'
import axios from 'axios'

import Login from './pages/login'
import Signup from './pages/signup'

function App() {
  const [user, setUser] = useState([])

  useEffect(() => {
    axios
      .get('http://kidsio.herokuapp.com/users')
      .then((res) => {
        setUser(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <BrowserRouter>
      <PrimarySearchAppBar />
      <div>
        <Route path='/' exact component={Login} />
        <Route path='/signup' component={Signup} />
      </div>
    </BrowserRouter>
  )
}

export default App
