import React from 'react'
import logo from '../../static/imgs/logo.jpg'
import { Link } from 'react-router-dom'

const Navlogo = () => {
	return (
		<>
			<div className="logo">
				<div className="logo-img"><Link to="/"><img src={logo} alt="logo" /></Link></div>
				<div className="logo-text"><h3><Link to="/">BLOG</Link></h3></div>
			</div>
		</>
	)
}

export default Navlogo
