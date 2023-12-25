// IMPORT PACKAGES
import React, { useContext } from 'react'

import './Navbar.css' // IMPORT CSS

import blogContext from '../../Context/BlogContext' // IMPORT CONTEXT

// IMPORT COMPONENTS
import Searchbar from './Searchbar'
import Sessionbutton from './Sessionbutton'
import NavigationButton from './NavigationButton'
import Navlogo from './Navlogo'

const Navbar = (props) => {
	const { user, setUser, isAuth, setIsAuth } = useContext(blogContext);

	return (
		<nav className="navbar">
			<div className="nav-bg"></div>
			<Searchbar isSearchBar={props.isSearchBar} />
			<Navlogo />
			{props.isSign && !isAuth ?
				<Sessionbutton />
				: props.isSign && isAuth ?
					<NavigationButton user={user} isAuth={isAuth} setIsAuth={setIsAuth} isAdd={props.isAdd} setUser={setUser} />
					: ""}
		</nav>
	)
}

Navbar.defaultProps = {
	isSearchBar: true,
	isSign: true,
	isAdd: true
}

export default Navbar

