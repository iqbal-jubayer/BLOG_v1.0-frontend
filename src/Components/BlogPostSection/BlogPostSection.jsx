// IMPORT PACKAGES
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// IMPORT COMPONENTS
import MainBlogPost from './MainBlogPost';
import SideBlogPost from './SideBlogPost'

import './BlogPostSection.css' // IMPORT CSS

const BlogPost = () => {
  const { blogID } = useParams();
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    // <--API CALLS
    const getBlog = () => {
      axios.get(`${process.env.REACT_APP_API}/blog/${blogID}`)
        .then(dat => { setBlog(dat.data[0]) })
        .catch(err => console.log(err));
    }; getBlog();
    // API CALLS-->
  }, [blogID]);

  return (
    <div className='blog-post'>
      <MainBlogPost blog={blog} />
      <span id='blog-left-right-sep'></span>
      <SideBlogPost />
    </div>
  )
}

export default BlogPost
