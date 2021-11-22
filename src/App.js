import { Route, BrowserRouter } from 'react-router-dom'
import React from 'react'

import Dashboard from './pages/dashboard'
// import ClippedDrawer from './components/drawer'
import Login from './pages/login'
import Signup from './pages/signup'
import Forgot from './pages/ForgotPassword'
import Reset from './pages/ResetPassword'
import Orders from './pages/Orders'
import Users from './pages/Users'
import ViewUser from './pages/ViewUser'
import Profile from './pages/Profile'
import ViewOrder from './pages/ViewOrder'
import MyOrders from './pages/MyOrders'
import CreateOrder from './pages/CreateOrder'
import Dashboards from './pages/Default/index'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './components/ProtectedRoute'
import Report from './pages/Report'
import Dispatch from './pages/Dispatch'

function App() {
  const [state, setstate] = React.useState(true)
  return (
    <div className='App'>
      <BrowserRouter>
        <div>
          <ToastContainer />
          <Route path='/auth/login' exact component={Login} />
          <Route path='/auth/signup' component={Signup} />
          <Route path='/auth/reset-password/:token' component={Reset} />
          <Route path='/auth/forgot-password' component={Forgot} />
          <Route path='/create' component={CreateOrder} />

          <ProtectedRoute
            path='/'
            component={Dashboards}
            isAuth={localStorage.getItem('token')}
            exact
          />

          <ProtectedRoute
            path='/orders'
            component={Orders}
            isAuth={
              localStorage.getItem('token') && localStorage.getItem('admin')
            }
          />
          <ProtectedRoute
            path='/order/:id'
            component={ViewOrder}
            isAuth={localStorage.getItem('token')}
          />

          <ProtectedRoute
            path='/users'
            component={Users}
            isAuth={
              localStorage.getItem('token') && localStorage.getItem('admin')
            }
          />

          <ProtectedRoute
            path='/report'
            component={Report}
            isAuth={
              localStorage.getItem('token') && localStorage.getItem('admin')
            }
          />

          <ProtectedRoute
            path='/dispatch'
            component={Dispatch}
            isAuth={
              localStorage.getItem('token') && localStorage.getItem('admin')
            }
          />

          <ProtectedRoute
            path='/user/:id'
            component={ViewUser}
            isAuth={
              localStorage.getItem('token') && localStorage.getItem('admin')
            }
          />

          <ProtectedRoute
            path='/profile'
            component={Profile}
            isAuth={localStorage.getItem('token')}
          />

          <ProtectedRoute
            path='/myorders'
            component={MyOrders}
            isAuth={localStorage.getItem('token')}
          />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
