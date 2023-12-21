import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import LeftSection from './LeftSection'
import RightSection from './RightSection'

import blogContext from '../../Context/BlogContext'

import './AccountSection.css'
import { useParams } from 'react-router-dom'

const AccountSection = () => {
  const { userID } = useParams();
  const { user } = useContext(blogContext)
  const [blogs, setBlogs] = useState([]);
  const [auther, setAuther] = useState({})
  const [isLogged,setLogged] = useState(false)

  const getBlogs = async () => {
    await axios.get(`${process.env.REACT_APP_API}/blog/getblogs?auther=${userID}`).then(res => { setBlogs(res.data) })
  }

  const getAuther = async () => {
    try{
      await axios.post(`${process.env.REACT_APP_API}/auth/getauther?username=${userID}`).then(res => { setAuther(res.data)})
    }catch(err){}
  }

  useEffect(() => {
    getAuther();
    getBlogs();
    if(user.username === userID){setLogged(true)};
  }, [user])

  return (
    <div className='account-section'>
      <LeftSection blogs={blogs} />
      <RightSection auther={auther} isLogged={isLogged}/>
    </div>
  )
}

export default AccountSection