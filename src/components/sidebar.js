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
// import PasswordIcon from '@mui/icons-material/Password'
import CreateIcon from '@mui/icons-material/Create'
import { NavLink } from 'react-router-dom'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

import SimpleAccordion from './accordion'
import BasicMenu from './dropdown'
import '../style/sidebar.css'
import logo from '../images/cover.png'
import Modals from './modal'
// import AccordionSummary from './accordion'
import CreateOrder from '../pages/CreateOrder'
import ChangePassword from '../pages/ChangePassword'
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
    fontSize: theme.typography.pxToRem(14),
    marginLeft: '-3px',
  },

  icon: {
    color: '#fff',
  },

  menuButton: {
    marginRight: theme.spacing(2),
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
    background: 'white',
  },
}))

function ResponsiveDrawer(props) {
  const { window } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <div className='side-image'>
        <img alt='profile' src={localStorage.getItem('pic')} />
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
                </div>
              </SimpleAccordion>
              <Divider />
            </>
          )}
        </span>
        <Divider />
        <div className='modal-container'>
          <CreateIcon className='modal-icon' />
          <div className='modal-div'>
            <Modals
              head={'Create Order'}
              text={'Create an order'}
              secondaryText={'Fill details to change your password'}
            >
              <CreateOrder />
            </Modals>
          </div>
        </div>
        {[
          { name: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard' },
          { name: 'Settings', icon: <SettingsIcon />, link: '/auth/login' },
          { name: 'Logout', icon: <ExitToAppIcon />, link: '/auth/signup' },
        ].map((text, index) => (
          <ListItem
            button
            key={index}
            component={NavLink}
            to={text.link}
            className={classes.button}
          >
            <ListItemIcon className={classes.icon}>{text.icon}</ListItemIcon>
            <ListItemText primary={text.name} className={classes.name} />
          </ListItem>
        ))}
        <Divider />
        <SimpleAccordion
          background={'#031c35'}
          name={localStorage.getItem('name')}
          icon={<PersonIcon />}
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
              <NavLink to='/myorders/' className='side-link'>
                My Orders
              </NavLink>
            </div>
          </div>
        </SimpleAccordion>
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
            <MenuIcon />
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
