// IMPORT PACKAGES
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import blogContext from '../../Context/BlogContext' // IMPORT CONTEXT

import './SessionSystem.css' // IMPORT CSS

import Alert from '../Alert/Alert'

const SignUp = () => {
	const navigate = useNavigate();
	const { checkAuthentication, setIsAuth } = useContext(blogContext);

	const [userList, setUserList] = useState([]);
	const [emailList, setEmailList] = useState([]);
	const [isAlert, setIsAlert] = useState(false);
	const [alertMsg, setAlertMsg] = useState("Alert")
	const [isUsrnameUsed, setIsUsrnameUsed] = useState("")

	const [user, setUser] = useState({
		"name": "",
		"username": "",
		"email": "",
		"password": ""
	})

	const HandleChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		setUser({ ...user, [name]: value })
		if (name === "username") {
			if (userList.includes(value)) {
				setIsUsrnameUsed(true)
			} else {
				setIsUsrnameUsed(false)
			}
		}
	}

	const getEmailList = async () => {
		await axios.post('http://localhost:5000/api/auth/getmeaillist').then(res => { setUserList(res.data["usernameList"]); setEmailList(res.data["emailList"]) }).catch(err => { console.log("Can't find userList and emailList") })
	}

	useEffect(() => {
		getEmailList();
		if (isAlert) {
			setTimeout(() => setIsAlert(false), 5000)
		}
	}, [isAlert])


	const HandleSignUp = async (e) => {
		e.preventDefault();
		if (userList.includes(user.username) || emailList.includes(user.email)) {
			setAlertMsg("username or email address already used")
			setIsAlert(true);
			setUser({ ...user, "password": "" })
		} else {
			await axios.post(`${process.env.REACT_APP_API}/auth/createuser`, user, { headers: { "Content-Type": "application/json" } }).then(res => { 
				setIsAuth(true)
				localStorage.setItem('isAuth', true);
				localStorage.setItem('auth-token', res.data);
				checkAuthentication();
				navigate('/');
			})
		}
	}

	return (
		<div className='signup base-bg-1'>
			<Alert msg={alertMsg} active={isAlert} />
			<form method="post" onSubmit={HandleSignUp}>
				<div className='signin-items'>
					<div className="sign-input">
						<input className='base-input' type="text" placeholder='Fullname' autoComplete='off' onChange={HandleChange} value={user.name} name='name' minLength={3} required />
					</div>
				</div>
				<div className='signin-items'>
					<div className="sign-input">
						<input className='base-input' type="text" placeholder='Username' autoComplete='off' onChange={HandleChange} value={user.username} name='username' minLength={5} required />
						{isUsrnameUsed ? <p>username already used</p> : ""}
					</div>
				</div>
				<div className='signin-items'>
					<div className="sign-input">
						<input className='base-input' type="email" placeholder='Email Address' autoComplete='off' onChange={HandleChange} value={user.email} name='email' required />
					</div>
				</div>
				<div className='signin-items'>
					<div className="sign-input">
						<input className='base-input' type="password" placeholder='Password' onChange={HandleChange} value={user.password} name='password' minLength={6} required />
					</div>
				</div>
				<div className="signin-btn"><button className='btn' type="submit">Sign Up</button></div>
			</form>
		</div>
	)
}

export default SignUp
