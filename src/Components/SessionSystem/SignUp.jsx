// IMPORT PACKAGES
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import blogContext from '../../Context/BlogContext' // IMPORT CONTEXT

import './SessionSystem.css' // IMPORT CSS

const SignUp = () => {
	const navigate = useNavigate();
	const { checkAuthentication, setIsAuth } = useContext(blogContext);

	const [isUserExist, setIsUserExist] = useState("");
	const [isEmailExist, setIsEmailExist] = useState("");

	const [userList, setUserList] = useState([]);
	const [emailList, setEmailList] = useState([]);

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
			if (value.length >= 5) {
				if (userList.includes(value)) {
					setIsUserExist("username already exist");
				} else {
					setIsUserExist("")
				}
			} else {
				setIsUserExist("")
			}
		} else if (name === "email") {
			if (value.includes("@")) {
				if (emailList.includes(value)) {
					setIsEmailExist("Email already used");
				} else {
					setIsEmailExist("")
				}
			} else {
				setIsEmailExist("")
			}
		}
	}

	const getEmailList = async () => {
		await axios.post('http://localhost:5000/api/auth/getmeaillist').then(res => { setUserList(res.data["usernameList"]); setEmailList(res.data["emailList"]) }).catch(err => { console.log(err) })
	}

	useEffect(() => {
		getEmailList();
	}, [])


	const HandleSignUp = async (e) => {
		e.preventDefault();
		await axios.post(`${process.env.REACT_APP_API}/auth/createuser`, user, { headers: { "Content-Type": "application/json" } }).then(res => {
			setIsAuth(true)
			localStorage.setItem('isAuth', true);
			localStorage.setItem('auth-token', res.data);
			checkAuthentication();
			navigate('/');
		}).catch(err => {
			alert(err.response.data);
		});
	}

	return (
		<div className='signup'>
			<form method="post" onSubmit={HandleSignUp}>
				<div className='signin-items'><label htmlFor="name">Full Name:</label><div className="sign-input"><input className='base-input' type="text" autoComplete='off' onChange={HandleChange} value={user.name} name='name' /><p>*minimum 3 character long*</p></div></div>
				<div className='signin-items'><label htmlFor="username">Username:</label><div className="sign-input"><input className='base-input' type="text" autoComplete='off' onChange={HandleChange} value={user.username} name='username' /><p>{isUserExist}</p><p>*minimum 5 character long*</p></div></div>
				<div className='signin-items'><label htmlFor="email">Email:</label><div className="sign-input"><input className='base-input' type="email" autoComplete='off' onChange={HandleChange} value={user.email} name='email' /><p>{isEmailExist}</p></div></div>
				<div className='signin-items'><label htmlFor="password">Password:</label><div className="sign-input"><input className='base-input' type="password" onChange={HandleChange} value={user.password} name='password' /><p>*minimum 6 character long*</p></div></div>
				<div className="signin-btn"><button className='btn' type="submit">Sign Up</button></div>
			</form>
		</div>
	)
}

export default SignUp
