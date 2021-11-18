import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SettingsIcon from '@material-ui/icons/Settings'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonIcon from '@mui/icons-material/Person'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CreateIcon from '@mui/icons-material/Create'
import { NavLink } from 'react-router-dom'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import SimpleAccordion from './accordion'
import BasicMenu from './dropdown'
import '../style/sidebar.css'
import logo from '../images/cover.png'
import Modals from './modal'
// import AccordionSummary from './accordion'
import ChangePassword from '../pages/ChangePassword'
import EditUser from '../pages/EditUser'
import { toast } from 'react-toastify'
// import Orders from '../pages/Orders'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    maxWidth: '100%',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      background: 'white',
      color: 'black',
    },
  },

  name: {
    fontSize: theme.typography.pxToRem(17),
    marginLeft: '-3px',
  },

  icon: {
    color: '#fff',
  },

  menuButton: {
    marginRight: theme.spacing(2),
    backgroundColor: '#fff',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: '#05386b',
    color: '#fff',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    background: '#f5f5f5',
    width: '100%',
    overflow: 'scroll',
    height: '100vh',
  },
}))

function ResponsiveDrawer(props) {
  const { window } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [profile, setProfile] = React.useState(false)
  const [file, setFile] = React.useState('')

  const history = useHistory()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const logout = () => {
    localStorage.setItem('token', null)
    localStorage.setItem('name', null)
    localStorage.setItem('id', null)
    localStorage.setItem('email', null)
    localStorage.setItem('pic', null)
    localStorage.setItem('email', null)
    localStorage.setItem('admin', null)

    history.push('/auth/login')
  }

  const id = localStorage.getItem('id')

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo
      let baseURL = ''
      // Make new FileReader
      let reader = new FileReader()

      // Convert the file to base64 text
      reader.readAsDataURL(file)

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log('Called', reader)
        baseURL = reader.result
        resolve(baseURL)
      }
    })
  }
  const addPic = (e) => {
    console.log(e)
    if (e) {
      if (
        e.type.includes('png') ||
        e.type.includes('jpg') ||
        e.type.includes('jpeg')
      ) {
        if (e.size <= 500000) {
          getBase64(e)
            .then((result) => {
              e['base64'] = result
              let data = {
                profilePic: result,
              }
              let headers = {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
              }
              axios
                .post('http://kidsio.herokuapp.com/users/changepic', data, {
                  headers: headers,
                })
                .then((res) => {
                  if (res.data.hasError === false) {
                    toast.success('Profile has been updated successfully')
                    localStorage.setItem('pic', res.data.pic)
                    setFile(res.data.pic)
                    setProfile(!profile)
                  } else {
                    toast.error(res.data.message)
                  }
                })
                .catch((err) => {
                  toast.error('sorry something went wrong')
                })
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          toast.warn('Image should be less than 500kb')
        }
      } else {
        toast.warn('Image must be PNG or JPG format')
      }
    }
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <div className='side-image'>
        <img alt='profile' src={file || localStorage.getItem('pic')} />
        <div className='side-add'>
          <AddCircleIcon className='add-icon' />
          <input
            type='file'
            onChange={(e) => addPic(e.target.files[0])}
            className='file'
          />
        </div>
      </div>
      <div className='user-name'>
        <p>{localStorage.getItem('name')}</p>
      </div>
      <Divider />
      <List>
        <span>
          {localStorage.getItem('admin') === 'true' && (
            <>
              <SimpleAccordion
                background={'#031c35'}
                name='Admin'
                icon={<AdminPanelSettingsIcon />}
              >
                <div className='side-accordion'>
                  <NavLink to='/users' className='side-link'>
                    All Users
                  </NavLink>
                  <NavLink to='/orders' className='side-link'>
                    All Orders
                  </NavLink>
                  <NavLink to='/report' className='side-link'>
                    Report
                  </NavLink>
                </div>
              </SimpleAccordion>
              <Divider />
            </>
          )}
        </span>

        <Divider />

        <ListItem
          button
          component={NavLink}
          to={'/'}
          className={classes.button}
        >
          <ListItemIcon className={classes.icon}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={'Dashboard'} className={classes.name} />
        </ListItem>

        <Divider />

        <SimpleAccordion
          background={'#031c35'}
          name={'Order'}
          icon={<CreateIcon />}
        >
          <div className='side-accordion'>
            <NavLink to='/create' className='side-link'>
              Create Order
            </NavLink>
            <NavLink to='/myorders/' className='side-link'>
              My Orders
            </NavLink>
          </div>
        </SimpleAccordion>

        <Divider />

        <SimpleAccordion
          background={'#031c35'}
          name={'Setting'}
          icon={<SettingsIcon />}
        >
          <div className='side-accordion'>
            <div>
              <div className='modal-div1'>
                <Modals
                  head={'Change Password'}
                  text={'Change Password'}
                  secondaryText={'Fill details to change your password'}
                  color={'white'}
                >
                  <ChangePassword />
                </Modals>
              </div>
              <div className='modal-div1'>
                <Modals
                  head={'Edit Profile'}
                  text={'Edit Profile'}
                  secondaryText={'Fill details to edit your profile'}
                  color={'white'}
                >
                  <EditUser />
                </Modals>
              </div>
            </div>
          </div>
        </SimpleAccordion>

        <Divider />

        <ListItem button className={classes.button} onClick={logout}>
          <ListItemIcon className={classes.icon}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={'Logout'} className={classes.name} />
        </ListItem>
      </List>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon className='hamburg' />
          </IconButton>
          <Typography variant='h6' noWrap className='side-header'>
            <img src={logo} alt='logo' className='logo' />
            <BasicMenu />
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  )
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default ResponsiveDrawer
