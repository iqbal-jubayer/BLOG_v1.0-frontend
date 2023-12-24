import React, { useEffect, useState } from 'react'
import logo from '../../static/blank-profile.png'
import { Link } from 'react-router-dom'
import { htmlToText } from 'html-to-text'

import './BlogItem.css'

const BlogItem = (props) => {
  const [date, setDate] = useState(props.blog.date);

  useEffect(() => {
    setDate(date.split("T")[0].split('-').reverse().join("/"));
  }, [date])

  return (
    <div className='blogitem'>
      <div className="left-blogitem"><Link to={`/blogs/${props.blog._id}`}><img src={logo} alt="" /></Link></div>
      <div className="right-blogitem">
        <h3 className="blogitem-title"><Link to={`/blogs/${props.blog._id}`}>{props.blog.title}</Link></h3>
        <div className="blogitem-desc">{htmlToText(props.blog.description)}</div>
        <div className="blogitem-auther-info">By: <Link to={`/user/${props.blog.auther}`}>{props.blog.auther}</Link> on: {date}</div>
      </div>
    </div>
  )
}

export default BlogItem
