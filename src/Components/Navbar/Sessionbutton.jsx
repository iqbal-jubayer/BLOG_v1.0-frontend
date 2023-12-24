import React from 'react'
import { Link } from 'react-router-dom'

const Sessionbutton = (props) => {
	return (
		<>
			<div className="sign-system">
				<ul>
					<li><Link className='btn' to="/signup">SignUp</Link></li>
					<li><Link className='btn' to="/signin">SignIn</Link></li>
				</ul>
			</div>
		</>
	)
}

export default Sessionbutton
