import React, { useContext, useEffect, useState } from 'react'
import logo from '../../static/imgs/blank-profile.png'
import { Link, useParams } from 'react-router-dom'
import { htmlToText } from 'html-to-text'

import './BlogItem.css'

import blogContext from '../../Context/BlogContext'

const BlogItem = (props) => {
  const [date, setDate] = useState(props.blog.date);
  const { user } = useContext(blogContext);
  const { userID } = useParams();
  const [isCtrl, setIsCtrl] = useState(false);

  // <--HANDLE FUNCTION
  const HandlEdit = () => {
    console.log("Edit");
  }
  // HANDLE FUNCTION-->

  useEffect(() => {
    if (props.shouldCtrl) {
      if (user.username === userID) {
        setIsCtrl(true)
      }
    }
    setDate(date.split("T")[0].split('-').reverse().join("/"));
  }, [date, props.shouldCtrl, user, userID])

  return (
    <div className='blogitem'>
      <div className="left-blogitem">
        <Link to={`/blogs/${props.blog._id}`}><img src={logo} alt="" /></Link>
      </div>
      <div className="right-blogitem">
        <h3 className="blogitem-title">
          <Link to={`/blogs/${props.blog._id}`}>{props.blog.title}</Link>
          {isCtrl ?
            <div className="blogitem-ctrl">
              <div id='edit-btn' onClick={HandlEdit} ></div>
              <div id='delete-btn' onClick={() => props.HandleDelete(props.blog)} ></div>
            </div> : ""}

        </h3>
        <div className="blogitem-desc">{htmlToText(props.blog.description)}</div>
        <div className="blogitem-auther-info">By: <Link to={`/user/${props.blog.auther}`}>{props.blog.auther}</Link> on: {date}</div>
      </div>
    </div>
  )
}

export default BlogItem
