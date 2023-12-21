// IMPORT PACKAGES
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import blogContext from '../../Context/BlogContext' // IMPORT CONTEXT

import './SessionSystem.css' // IMPORT CSS

const SignIn = () => {
  const navigate = useNavigate();
  const { setIsAuth, checkAuthentication } = useContext(blogContext);

  const [user, setUser] = useState({
    "email": "",
    "password": ""
  })

  const HandleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value })
  }


  const HandleSignIn = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_API}/auth/signin`, user, { headers: { "Content-Type": "application/json" } }).then(res => {
      // console.log(res)k
      setIsAuth(true)
      localStorage.setItem('isAuth', true);
      localStorage.setItem('auth-token', res.data);
      checkAuthentication();
      navigate('/');
    }).catch(err => {
      console.log(err)
      let statusCode = err.response.status
      if (statusCode) {
        alert(err.response.data);
        setUser({ "email": user.email, "password": "" });
      }
    });
  }

  return (
    <div className='signup'>
      <form method="post" onSubmit={HandleSignIn}>
        <div className='signin-items'><label htmlFor="email">Email:</label><div className="sign-input"><input className='base-input' autoComplete='off' type="email" onChange={HandleChange} value={user.email} name='email' /></div></div>
        <div className='signin-items'><label htmlFor="password">Password:</label><div className="sign-input"><input className='base-input' type="password" onChange={HandleChange} value={user.password} name='password' /></div></div>
        <div className="signin-btn"><button className='btn' type="submit">Sign In</button></div>
      </form>
    </div>
  )
}

export default SignIn
