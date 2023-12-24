// IMPORT PACKAGES
import React from 'react'

const MainBlogPost = (props) => {
  return (
    <div className='main-blog-post base-bg-1'>
      <div className="inner-main-blog-post">
        <div className="blog-title"><h2>{props.blog.title}</h2></div>
        <div className="blog-description" dangerouslySetInnerHTML={{__html:props.blog.description}}></div>
      </div>
    </div>
  )
}

export default MainBlogPost
