import {
  Box,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Drawer,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import Help from '@material-ui/icons/Help'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'

export default function ButtonAppBar() {
  return (
    <List>
      <ListItem button component={Link} to={'/'}>
        <ListItemIcon>
          <Help />
        </ListItemIcon>
        <ListItemText primary='Home' />
      </ListItem>
      <Divider />
      <ListItem button component={Link} to={'/signup'}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary='Projects' />
      </ListItem>
      <Divider />
    </List>
  )
}
