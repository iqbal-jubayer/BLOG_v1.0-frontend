// IMPORT PACKAGES
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import blogContext from '../../Context/BlogContext' // IMPORT CONTEXT


import './SessionSystem.css' // IMPORT CSS

// IMPORT COMPONENTS
import Signitems from './Signitems'
import Alert from '../Alert/Alert'

const SignIn = () => {
  const navigate = useNavigate();
  const { setIsAuth, checkAuthentication } = useContext(blogContext);

  const [user, setUser] = useState({
    "username": "",
    "password": ""
  });
  const [isAlert, setIsAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("")

  // <--HANDLE FUNCTION
  const HandleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value })
  }

  const HandleSignIn = async (e) => {
    e.preventDefault();
    // API CALL
    await axios.post(`${process.env.REACT_APP_API}/auth/signin`, user, { headers: { "Content-Type": "application/json" } }).then(res => {
      setIsAuth(true)
      localStorage.setItem('isAuth', true);
      localStorage.setItem('auth-token', res.data);
      checkAuthentication();
      navigate('/');
    }).catch(err => {
      if (err.response !== undefined) {
        let statusCode = err.response.status
        if (statusCode) {
          setIsAlert(true);
          setAlertMsg(err.response.data);
          setUser({ "username": user.username, "password": "" });
        }
      } else {
        console.log(err);
      }
    });

  }
  // HANDLE FUNCTION-->

  useEffect(() => {
    setInterval(() => {
      setIsAlert(false);
    }, 5000);
  }, [setIsAlert])

  return (
    <div className='sign base-bg-1'>
      <Alert active={isAlert} msg={alertMsg} />
      <form method="post" onSubmit={HandleSignIn}>
        <Signitems type="text" placeholder="Email Address or Username" HandleChange={HandleChange} value={user.username} name="username" />
        <Signitems type="password" placeholder="Password" HandleChange={HandleChange} value={user.password} name="password" minLength={6} />
        <div className="sign-btn">
          <button className='btn' type="submit">Sign In</button>
        </div>

      </form>
    </div>
  )
}

export default SignIn
