import React from 'react'
import './Illustration.css'

const Illustration = (props) => {
  return (
    <div className='illustration'>
      <img src={props.svg} width={props.width} height={props.height} />
      <h2>{props.text}</h2>
    </div>
  )
}

export default Illustration
