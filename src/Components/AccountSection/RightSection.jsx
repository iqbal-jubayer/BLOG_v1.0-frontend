import React from 'react'

const RightSection = (props) => {
  return (
    <div className='right-section base-bg-2'>
      <div className="auther-info">
        <div className="dp-container"><img src={props.auther.dpURL} alt="" /></div>
        <div className="username-container"><h3>{props.auther.username}</h3></div>
        <div className="auther-info-items"><p><b>Name:</b> {props.auther.name}</p></div>
        <div className="auther-info-items"><p><b>Email:</b> email@email.com</p></div>
        <div className="auther-info-items"><p>Lorem, ipsum dolor.</p></div>
        <div className="auther-info-items"><p>Lorem, ipsum dolor.</p></div>
        <div className="auther-info-items"><p>Lorem, ipsum dolor.</p></div>
        <div className="auther-info-items"><p>Lorem, ipsum dolor.</p></div>
      </div>
      {props.isLogged?<div><a className="edit-btn btn" href="/settings/:userID">Edit</a></div>:""}
    </div>
  )
}

export default RightSection
