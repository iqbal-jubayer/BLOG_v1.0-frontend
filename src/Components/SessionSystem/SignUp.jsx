// IMPORT PACKAGES
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import blogContext from '../../Context/BlogContext' // IMPORT CONTEXT

import './SessionSystem.css' // IMPORT CSS

import Alert from '../Alert/Alert'

// IMPORT COMPONENTS
import Signitems from './Signitems'

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

	// <--HANDLE FUNCTION
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
	// HANDLE FUNCTION-->

	useEffect(() => {
		// <--API CALLS
		const getEmailList = async () => {
			await axios.post(`${process.env.REACT_APP_API}/auth/getemaillist`).then(res => { setUserList(res.data["usernameList"]); setEmailList(res.data["emailList"]) }).catch(err => { console.log("Can't find userList and emailList") })
		}; getEmailList();
		// API CALLS-->

		if (isAlert) {
			setTimeout(() => setIsAlert(false), 5000)
		}
	}, [isAlert])

	return (
		<div className='sign base-bg-1'>
			<Alert msg={alertMsg} active={isAlert} />
			<form method="post" onSubmit={HandleSignUp}>
				<Signitems type="text" placeholder="Fullname" HandleChange={HandleChange} value={user.name} name="name" minLength={5} />
				<Signitems type="text" placeholder="Username" HandleChange={HandleChange} value={user.username} name="username" minLength={5} isUsrnameUsed={isUsrnameUsed} />
				<Signitems type="email" placeholder="Email Address" HandleChange={HandleChange} value={user.email} name="email" />
				<Signitems type="password" placeholder="Password" HandleChange={HandleChange} value={user.password} name="password" minLength={6} />
				<div className="sign-btn"><button className='btn' type="submit">Sign Up</button></div>
			</form>
		</div>
	)
}

export default SignUp
