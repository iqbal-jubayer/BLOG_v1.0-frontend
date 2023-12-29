// IMPORT PACKAGES
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// IMPORT COMPONENTS
import LeftSection from './LeftSection';
import RightSection from './RightSection';

import blogContext from '../../Context/BlogContext'; // IMPORT CONTEXT

import './AccountSection.css'; // IMPORT CSS

const AccountSection = () => {
  const { userID } = useParams();

  const { user, getBlogs } = useContext(blogContext);

  const [blogs, setBlogs] = useState([]);
  const [auther, setAuther] = useState({});
  const [isLogged, setLogged] = useState(false);

  // <--HANDLE FUNCTION

  const HandleDelete = async (blog) => {
    const del = window.confirm('Do you want to delete?');
    if (del) {
      await axios.post(`${process.env.REACT_APP_API}/blog/deleteblog`, {}, { headers: { 'auth-token': localStorage.getItem('auth-token'), "blog-id": blog._id } })
        .then(res => {
          setBlogs(blogs.filter(e => { return e !== blog }));
          getBlogs();
        })
        .catch(err => console.log(err));
    }
  }

  // HANDLE FUNCTION-->


  useEffect(() => {

    // <--API CALLS
    const getBlogs = async () => {
      await axios.get(`${process.env.REACT_APP_API}/blog/getblogs?auther=${userID}`).then(res => { setBlogs(res.data) });
    }; getBlogs();
    const getAuther = async () => {
      try {
        await axios.post(`${process.env.REACT_APP_API}/auth/getuserinfo`, {
          filter: { username: userID }, query: []
        }).then(res => { setAuther(res.data) });
      } catch (err) { };
    }; getAuther();
    // API CALLS-->

    if (user.username === userID) { setLogged(true); };
  }, [user, userID]);

  return (
    <div className='account-section'>
      <LeftSection blogs={blogs} HandleDelete={HandleDelete} />
      <RightSection auther={auther} user={user} isLogged={isLogged} />
    </div>
  );
};

export default AccountSection;