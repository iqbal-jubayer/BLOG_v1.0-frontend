// IMPORT PACKAGES
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import axios from 'axios'

// IMPORT COMPONENTS
import SideFeed from './SideFeed'
import MainFeed from './MainFeed'

import blogContext from '../../Context/BlogContext' // IMPORT CONTEXT

import './FeedSection.css' // IMPORT CSS

const Main = () => {
  const { isAuth, blogs } = useContext(blogContext);

  const [following, setFollowing] = useState([])

  useEffect(() => {
    const getFollowing = async () => {
      await axios.post(`${process.env.REACT_APP_API}/auth/getfollowing`, {}, { headers: { 'auth-token': localStorage.getItem('auth-token') } }).then(res => setFollowing(res.data)).catch(err => console.log(err));

    }; if (isAuth) getFollowing();
  }, [isAuth])

  return (
    <div className="feed-section">
      <SideFeed following={following} />
      <span id='feed-left-right-sep'></span>
      <MainFeed blogs={blogs} />
    </div>
  )
}

export default Main;
