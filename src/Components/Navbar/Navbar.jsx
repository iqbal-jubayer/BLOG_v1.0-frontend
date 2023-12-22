// IMPORT PACKAGES
import React, { useContext } from 'react'
import logo from '../../static/logo.jpg'
import { Link, useNavigate } from 'react-router-dom'

import './Navbar.css' // IMPORT CSS

import blogContext from '../../Context/BlogContext' // IMPORT CONTEXT

const Navbar = (props) => {
	const navigate = useNavigate()
	const { user, setUser, isAuth, setIsAuth } = useContext(blogContext);

	const HandleLogout = () => {
		localStorage.removeItem('isAuth');
		localStorage.removeItem('auth-token');
		setIsAuth(false);
		setUser({})
	}

	const HandleAddBlog = () => {
		if (isAuth) {
			navigate(`/createblog`)
		}
	}

	const toggleNavList = (e) => {
		document.querySelector('.nav-list').classList.toggle('nav-list-active')
	}

	return (
		<nav className="navbar">
			<div className="nav-bg"></div>
			{props.isSearchBar ? <div className="searchbar"><form action=""><input placeholder='Search' type="text" /><button type="submit" className='search-btn'>&rarr;</button></form></div> : ""}
			<div className="logo">
				<div className="logo-img"><Link to="/"><img src={logo} alt="logo" /></Link></div>
				<div className="logo-text"><h3><Link to="/">BLOG</Link></h3></div>
			</div>
			{props.isSign && !isAuth ?
				<>
					<div className="sign-system">
						<ul>
							<li><Link className='btn' to="/signup">SignUp</Link></li>
							<li><Link className='btn' to="/signin">SignIn</Link></li>
						</ul>
					</div>

				</> : props.isSign && isAuth ?
					<>
						<div className="burger-container">
							<h4 className="burger-title">{user.name}</h4>
							{user.dpURL !== undefined ? <div className="burger" onClick={toggleNavList} style={{ backgroundImage: `url(${user.dpURL})`, backgroundSize: `cover`, backgroundRepeat:'no-repeat' }}></div> : <div className="burger" onClick={toggleNavList}></div>}
						</div>
						<div className="nav-list" >
							<ul>
								<li><Link className='btn' to={`/user/${user.username}`}>Accounts</Link></li>
								<li><Link className='btn' to={`/settings/${user.username}`}>Settings</Link></li>
								<li><a className='btn' href="/" onClick={HandleLogout}>Logout</a></li>
							</ul>
						</div>
						{props.isAdd ? <div id='AddBlog' onClick={HandleAddBlog}></div> : ""}
					</> : <h1>{isAuth}</h1>}
		</nav>
	)
}

Navbar.defaultProps = {
	isSearchBar: true,
	isSign: true,
	isAdd: true
}

export default Navbar

