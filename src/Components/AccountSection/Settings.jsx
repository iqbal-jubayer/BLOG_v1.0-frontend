import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import blogContext from '../../Context/BlogContext';

const Settings = () => {
	const { userID } = useParams();
	const { user } = useContext(blogContext)

	useEffect(() => {
		if (user.username !== undefined && user.username !== userID) {
			window.location.replace("/invalidauth")
		}
	}, [user, userID])

	return (
		<div className="Settings">
			This is Settings
		</div>
	)
}

export default Settings
