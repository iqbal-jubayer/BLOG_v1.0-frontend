import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';

import blogContext from '../../Context/BlogContext'

import AccountForm from '../AccountSection/AccountForm';
import Alert from '../Alert/Alert'

import './SettingsSection.css'

const SettingsSection = () => {
	const { user, getBlogs } = useContext(blogContext);

	const [tempUser, setTempUser] = useState({
		name: "",
		username: "",
		dpURL: "",
		email: ""
	});
	const [tempUserLoaded, setTempUserLoaded] = useState(false);
	const [isAlert, setIsAlert] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");

	// <--HANDLE FUNCTION
	const HandleChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		setTempUser({ ...tempUser, [name]: value });
	}

	const HandleSubmit = async (e) => {
		e.preventDefault()
		axios.post(`${process.env.REACT_APP_API}/auth/updateuser`, tempUser, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
			.then(res => {
				setIsAlert(true);
				setAlertMsg(res.data);
				getBlogs();
			})
			.catch(err => console.log(err));
	}
	// HANDLE FUNCTION-->

	useEffect(() => {
		if (Object.keys(user).length !== 0 & !tempUserLoaded) {
			setTempUser({ ...user });
			setTempUserLoaded(true);
		}

		setInterval(() => setIsAlert(false), 5000);

	}, [user, tempUserLoaded]);

	return (
		<div className="settings-section base-bg-1">
			<Alert active={isAlert} msg={alertMsg} />

			<div className="inner-settings-section">

				<div className="settings-item">
					<h2>Settings</h2>
				</div>

				<AccountForm HandleSubmit={HandleSubmit} HandleChange={HandleChange} dpURL={tempUser.dpURL} name={tempUser.name} username={tempUser.username} email={tempUser.email} />

				<div className="settings-item">
					<button className="btn">Subscription</button>
					<button className="btn">Change Password</button>
				</div>

			</div>
		</div>
	)
}

export default SettingsSection
