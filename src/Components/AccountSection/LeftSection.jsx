import React from 'react'

import BlogItem from '../BlogItem/BlogItem'
const LeftSection = (props) => {

	return (
		<div className='left-section base-bg-1'>
			<h2>Blogs</h2>
			{props.blogs.map((e)=>(
          <BlogItem key={e._id} blog={e}/>
        ))}
		</div>
	)
}

export default LeftSection
