import React from 'react'
import { useNavigate } from 'react-router-dom';

const AccountForm = (props) => {
	const navigate = useNavigate();
	return (
		<form className='settings-item settings-form' action="POST" onSubmit={props.HandleSubmit}>

			<div className="settings-form-items settings-dp-container">
				<img src={props.dpURL} alt="" />
			</div>

			<div className="settings-form-items">
				<input type="text" className="base-input" onChange={props.HandleChange} name='name' value={props.name} placeholder='Fullname' required minLength={3} />
			</div>

			<div className="settings-form-items">
				<input type="text" className="base-input" onChange={props.HandleChange} name='username' value={props.username} placeholder='Username' required minLength={5} />
			</div>

			<div className="settings-form-items">
				<input type="text" className="base-input" onChange={props.HandleChange} name='email' value={props.email} placeholder='Email' required />
			</div>

			<div className="settings-form-items">
				<button className="btn" type='Button' onClick={() => navigate(-1)}>Cancel</button>
				<button className="btn" type='Submit'>Save</button>
			</div>

		</form>
	)
}

export default AccountForm
