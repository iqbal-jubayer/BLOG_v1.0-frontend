import React from 'react'

const Searchbar = (props) => {
  return (
    <>
      {props.isSearchBar ? <div className="searchbar"><form action=""><input className='base-input' placeholder='Search' type="text" /><button type="submit" className='search-btn'>&rarr;</button></form></div> : ""}
    </>
  )
}

export default Searchbar
