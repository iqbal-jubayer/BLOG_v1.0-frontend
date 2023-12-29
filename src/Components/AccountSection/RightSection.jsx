import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import blogContext from '../../Context/BlogContext';

const RightSection = (props) => {
  const { isAuth } = useContext(blogContext);

  const [joinDate, setJoinDate] = useState("");
  const [followed, setFollowed] = useState(null)
  const [followers, setFollowers] = useState(0);

  // <--HANDLE FUNCTION
  const HandleFollow = async () => {
    if (followed) {
      setFollowed(false)
      await axios.post(`${process.env.REACT_APP_API}/auth/unfollow`, {}, { headers: { 'auth-token': localStorage.getItem('auth-token'), 'auther-id': props.auther._id } }).then(res => console.log(res)).catch(err => console.log(err));
      console.log("Unfollowed")
    } else {
      setFollowed(true)
      await axios.post(`${process.env.REACT_APP_API}/auth/follow`, {}, { headers: { 'auth-token': localStorage.getItem('auth-token'), 'auther-id': props.auther._id } }).then(res => console.log(res)).catch(err => console.log(err));
      console.log("Followed")
    }
  }
  // HANDLE FUNCTION-->

  useEffect(() => {
    if (Object.keys(props.auther).length !== 0) {
      setJoinDate(props.auther.date.split('T')[0].split('-').reverse().join('/'))
      setFollowers(props.auther.followers.length)
      if (props.auther.followers.includes(props.user._id)) setFollowed(true);
    };
  }, [props.auther.date, props.auther, props.user._id]);

  return (
    <div className='account-side-section base-bg-2'>
      <div className="account-auther-info">
        <div className="account-dp-container"><img src={props.auther.dpURL} alt="" /></div>
        <div className="account-username-container"><h3>{props.auther.username}</h3></div>
        <div className="account-auther-info-items"><p><b>Name:</b> {props.auther.name}</p></div>
        <div className="account-auther-info-items"><p><b>Email:</b> {props.auther.email}</p></div>
        <div className="account-auther-info-items"><p><b>Joined on</b> {joinDate}</p></div>
        <div className="account-auther-info-items"><p><b>Followers:</b> {followers}</p></div>
      </div>
      {isAuth ? <>{props.isLogged ? <div><Link className="btn" to={`/settings/${props.auther.username}`}>Edit</Link></div>
        : !followed ? <div><Link className="btn" onClick={HandleFollow}>Follow</Link></div> : followed ? <div><Link className="btn" onClick={HandleFollow}>Unollow {followed}</Link></div> : ""}</> : ""}
    </div>
  )
}

export default RightSection
