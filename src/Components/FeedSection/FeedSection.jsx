// IMPORT PACKAGES
import React from 'react'
import { useContext } from 'react'

// IMPORT COMPONENTS
import SideFeed from './SideFeed'
import MainFeed from './MainFeed'

import blogContext from '../../Context/BlogContext' // IMPORT CONTEXT

import './FeedSection.css' // IMPORT CSS

const Main = () => {
  const { blogs } = useContext(blogContext);
  return (
    <div className="feed-section">

      <SideFeed />
      <span id='feed-left-right-sep'></span>
      <MainFeed blogs={blogs} />
    </div>
  )
}

export default Main
