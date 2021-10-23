import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// import { NavLink } from 'react-router-dom'

import '../style/accordion.css'

export default function SimpleAccordion(props) {
  return (
    <div className='accordion-container'>
      <Accordion
        style={{ background: '#05386b', border: 'none', boxShadow: '0' }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          {props.icon}
          <Typography>{props.name}</Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{ background: props.background, border: 'none' }}
        >
          <div>{props.children}</div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
