import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'

import '../style/modal.css'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: 250,
  },
}))

export default function Modals(props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <List>
        <ListItem button onClick={handleOpen}>
          <ListItemText primary={props.head} />
        </ListItem>
      </List>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className='paper'>
            <div className='modal-header'>
              <div className='modal-body'>
                <div className='modal-text'>
                  <h3>{props.text}</h3>
                  <p>{props.secondaryText}</p>
                </div>
                <span className='modal-button'>
                  <button onClick={handleClose}>X</button>
                </span>
              </div>
            </div>
            <div>{props.children}</div>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
