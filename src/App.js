import { Route, BrowserRouter } from 'react-router-dom'

import Dashboard from './pages/dashboard'
// import ClippedDrawer from './components/drawer'
import Login from './pages/login'
import Signup from './pages/signup'
import Forgot from './pages/ForgotPassword'
import Reset from './pages/ResetPassword'
import Orders from './pages/Orders'
import Users from './pages/Users'
import ViewUser from './pages/ViewUser'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div>
          <Route path='/auth/login' exact component={Login} />
          <Route path='/auth/signup' component={Signup} />
          <Route path='/auth/reset-password/:token' component={Reset} />
          <Route path='/auth/forgot-password' component={Forgot} />
          <Route path='/auth/forgot-password' component={Forgot} />
          <Route path='/' component={Dashboard} exact />
          <Route path='/orders' component={Orders} exact />
          <Route path='/users' component={Users} exact />
          <Route path='/users/:id' component={ViewUser} exact />
          <Route path='/dashboard' component={Dashboard} exact />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
