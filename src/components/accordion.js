import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import Box from '@material-ui/core/Box'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SettingsIcon from '@material-ui/icons/Settings'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { NavLink } from 'react-router-dom'

import Modals from './modal'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    margin: 'auto',
    border: 'none',
    boxShadow: theme.shadows[0],
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    color: 'white',
    width: '85%',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginLeft: -13,
  },
  accordion: {
    backgroundColor: '#05386b',
    border: 'none',
    boxShadow: theme.shadows[0],
  },
  summary: {
    backgroundColor: '#05386b',
    border: 'none',
    width: '100%',
  },
  details: {
    color: 'white',
    padding: '0 0',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    width: '100%',
    border: '2px solid white',
  },
}))

export default function ControlledAccordions() {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        className={classes.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1bh-content'
          id='panel1bh-header'
          className={classes.summary}
        >
          <Typography className={classes.heading}>
            <SettingsIcon />
            Settings
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.details}>
            <Modals head={'Change Password'}>
              <List>
                <ListItem>
                  <ListItemText>
                    <h3>Change Password</h3>
                  </ListItemText>
                </ListItem>
              </List>
            </Modals>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
