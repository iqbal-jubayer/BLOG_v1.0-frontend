import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

import blogContext from '../../Context/BlogContext';

import Alert from '../Alert/Alert';

import './SettingsSection.css'

const SettingsSection = () => {
	const { userID } = useParams();
	const { user } = useContext(blogContext);

	const [tempUser, setTempUser] = useState({
		name: "",
		username: "",
		email: "",
		dpURL: ""
	});
	const [userList, setUserList] = useState([]);
	const [isUsrnameUsed, setIsUsrnameUsed] = useState(false);
	const [isAlert, setIsAlert] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");

	const HandleSubmit = (e) => {
		e.preventDefault();
		if (!isUsrnameUsed) {
			console.log("Okay");
		}
	}

	const HandleChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		setTempUser({ ...tempUser, [name]: value })
		if (name === "username") {
			if (userList.includes(value) && value !== user.username) {
				setIsUsrnameUsed(true)
			} else {
				setIsUsrnameUsed(false)
			}
		}
	}

	const HandleDelete = async (e) => {
		let pass = window.prompt("Enter Your Password")
		await axios.post(`http://127.0.0.1:5000/api/auth/signin`, { username: user.email, password: pass }, { headers: { "Content-Type": "application/json" } }).then(res => {
			if (localStorage.getItem('auth-token') === res.data) console.log("Deleted!");
		}).catch(err => {
			setIsAlert(true);
			setAlertMsg("Incorrect Password");
		});
	}

	const HandlePasswordChange = async (e) => {
		console.log("Change Password");
	}

	useEffect(() => {
		if (user.username !== undefined && user.username !== userID) {
			window.location.replace("/invalidauth")
		};

		// <--API CALLS
		const getEmailList = async () => {
			await axios.post('http://localhost:5000/api/auth/getmeaillist')
				.then((res) => {
					setUserList(res.data["usernameList"]);
					if (userList.length !== 0) {
						setUserList(userList.filter((e) => { return e !== user.username }));
					}
				})
				.catch(err => { console.log("Can't find userList and emailList") })
		}
		getEmailList();
		// API CALLS-->

		setInterval(() => {
			setIsAlert(false);
		}, 5000);
		setTempUser(user);
	}, [user, userID, userList])

	return (
		<div className="settings-section base-bg-1">
			<Alert active={isAlert} msg={alertMsg} />
			<div className="inner-settings-section">
				<form action="POST" onSubmit={HandleSubmit}>
					<div className="form-items"><img src={tempUser.dpURL} alt="DP" /></div>
					<div className="form-items"><input className='base-input' type="text" onChange={HandleChange} defaultValue={tempUser.name} name='name' required /></div>
					<div className="form-items"><input className='base-input' type="text" onChange={HandleChange} defaultValue={tempUser.username} name='username' required />{isUsrnameUsed ? <p>username already used</p> : ""}</div>
					<div className="form-items"><input className='base-input' type="text" onChange={HandleChange} defaultValue={tempUser.email} name='email' required /></div>
					<div className="form-items">
						<button className='btn' type='button' onClick={() => (window.history.back())}>Cancel</button>
						<button className='btn' type="submit">Save</button>
					</div>
				</form>
				<div className="sub-settings-section">
					<button className='btn' onClick={HandlePasswordChange}>Change Password</button>
					<button className='btn' onClick={HandleDelete}>Delete Account</button>
				</div>
			</div>
		</div>
	)
}

export default SettingsSection
