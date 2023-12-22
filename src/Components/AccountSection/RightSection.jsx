import React, { useEffect, useState } from 'react'

const RightSection = (props) => {
  const [joinDate, setJoinDate] = useState("")
  
  useEffect(()=>{
    if(props.auther.date !== undefined){
      setJoinDate(props.auther.date.split('T')[0].split('-').reverse().join('/'))
    }
  },[props.auther.date]);

  return (
    <div className='right-section base-bg-2'>
      <div className="auther-info">
        <div className="dp-container"><img src={props.auther.dpURL} alt="" /></div>
        <div className="username-container"><h3>{props.auther.username}</h3></div>
        <div className="auther-info-items"><p><b>Name:</b> {props.auther.name}</p></div>
        <div className="auther-info-items"><p><b>Email:</b> {props.auther.email}</p></div>
        <div className="auther-info-items"><p><b>Joined on</b> {joinDate}</p></div>
      </div>
      {props.isLogged?<div><a className="edit-btn btn" href={`/settings/${props.auther.username}`}>Edit</a></div>:""}
    </div>
  )
}

export default RightSection
