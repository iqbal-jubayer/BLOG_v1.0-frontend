import React from 'react'

import BlogItem from '../BlogItem/BlogItem'

const LeftSection = (props) => {
	return (
		<div className='account-main-section base-bg-1'>
			<h2>Blogs</h2>
			{props.blogs.lenght === 0 ? <h3 id='no-blog-text'>No blogs to show</h3> : ""}
			{props.blogs.map((e) => (
				<BlogItem key={e._id} blog={e} shouldCtrl={true} HandleDelete={props.HandleDelete} />
			))}
		</div>
	)
}

export default LeftSection
