import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavigationButton = (props) => {
	const navigate = useNavigate();

	// <--HANDLE FUNCTION
	const HandleAddBlog = () => {
		if (props.isAuth) {
			navigate(`/createblog`)
		}
	}

	const HandleLogout = () => {
		props.setIsAuth(false);
		props.setUser({})
		localStorage.removeItem('isAuth');
		localStorage.removeItem('auth-token');
	}
	// HANDLE FUNCTION-->

	const toggleNavList = (e) => {
		document.querySelector('.nav-list').classList.toggle('nav-list-active')
	}

	return (
		<>
			<div className="burger-container">
				<h4 className="burger-title">{props.user.name}</h4>
				{props.user.dpURL !== undefined ? <div className="burger" onClick={toggleNavList} style={{ backgroundImage: `url(${props.user.dpURL})`, backgroundSize: `cover`, backgroundRepeat: 'no-repeat' }}></div> : <div className="burger" onClick={toggleNavList}></div>}
			</div>
			<div className="nav-list" >
				<ul>
					<li><Link className='btn' to={`/user/${props.user.username}`}>Accounts</Link></li>
					<li><Link className='btn' to={`/settings/${props.user.username}`}>Settings</Link></li>
					<li><a className='btn' href="/" onClick={HandleLogout}>Logout</a></li>
				</ul>
			</div>
			{props.isAdd ? <div id='AddBlog' onClick={HandleAddBlog}></div> : ""}
		</>
	)
}

export default NavigationButton
