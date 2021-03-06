import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
// import Button from '@material-ui/core/Button'

import '../style/modal.css'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mode: {
    padding: '10px 20px',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: 250,
  },
  button: {
    cursor: 'pointer',
    padding: '0 0',
    backgroundColor: '#05386b',
    color: 'white',
    borderRadius: '5px',
    outline: 'none',
  },

  list: {
    height: '100%',
    padding: '0 0',
  },

  listItems: {
    margin: 'auto',
    padding: '0 0',
  },
}))

export default function Mode(props) {
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
      <List
        className={classes.button}
        sx={{ backgroundColor: props.background }}
      >
        <ListItem onClick={handleOpen} className={classes.List}>
          <ListItemText
            primary={props.head}
            style={{ color: props.color }}
            className={classes.listItems}
          />
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
            <div className={classes.mode}>{props.children}</div>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
