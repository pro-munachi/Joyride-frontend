import { Route, BrowserRouter, Switch } from 'react-router-dom'
import React from 'react'
import './App.css'

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
import Dashboards from './pages/Dashboard/index'
import Home from './pages/Home/Home.js'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './components/ProtectedRoute'
import Report from './pages/Report'
import Dispatch from './pages/Dispatch'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import Dispatcher from './pages/Dispatcher/Dispatcher'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div>
          <ToastContainer />
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/auth/login' exact component={Login} />
            <Route path='/auth/signup' component={Signup} />
            <Route path='/auth/reset-password/:token' component={Reset} />
            <Route path='/auth/forgot-password' component={Forgot} />
            <Route path='/create' component={CreateOrder} />

            <ProtectedRoute
              path='/dashboard'
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
              path='/dispatcher/:id'
              component={Dispatcher}
              isAuth={localStorage.getItem('token')}
            />

            <ProtectedRoute
              path='/myorders'
              component={MyOrders}
              isAuth={localStorage.getItem('token')}
            />

            <Route component={ErrorPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
