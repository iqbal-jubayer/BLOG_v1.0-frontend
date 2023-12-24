// IMPORT PACKAGES
import React from 'react'
import { Link } from 'react-router-dom'

const SideFeed = (props) => {
  const arrayDataItems = props.following.map((e,index)=>(
    <li key={index}><Link to={`/user/${e.username}`}><img src={e.dpURL} alt="logo" /><h3>{e.username}</h3></Link></li>
  ));

  return (
    <div className="feed-side-section base-bg-2">
      <ul>
        <h3>Following</h3>
        {arrayDataItems}
      </ul>
    </div>
  )
}

export default SideFeed
