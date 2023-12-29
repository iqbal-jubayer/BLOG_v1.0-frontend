import React, { useEffect } from 'react'

import './Alert.css'

const Alert = (props) => {
  
  useEffect(() => {
    const alert = document.getElementById('Alert');
    if (props.active) {
      alert.classList.add('alert-active')
    }
    else {
      alert.classList.remove('alert-active');
    }
  })
  return (
    <div className='alert base-bg-1' id='Alert'>
      {props.msg}
    </div>
  )
}

export default Alert
