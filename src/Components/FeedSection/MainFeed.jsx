// IMPORT PACKAGES
import React from 'react'

// IMPORT COMPONENTS
import BlogItem from '../BlogItem/BlogItem'

const MainFeed = (props) => {
  return (
    <div className="feed-main-section base-bg-1">
      {props.blogs.map((e) => (
        <BlogItem key={e._id} blog={e} />
      ))}
    </div>
  )
}

export default MainFeed
