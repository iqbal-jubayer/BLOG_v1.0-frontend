// IMPORT PACKAGES
import React from 'react'
import { Link } from 'react-router-dom'

// IMPORT STATICS
import home_logo from '../../static/home.png'

const SideFeed = () => {
  return (
    <div className="side-feed base-bg-2">
      <ul>
        <li><Link to="/"><img src={home_logo} alt="logo" /><h3>Feed</h3></Link></li>
      </ul>
    </div>
  )
}

export default SideFeed
