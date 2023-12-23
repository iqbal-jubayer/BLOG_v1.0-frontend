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

  const { user } = useContext(blogContext);

  const [blogs, setBlogs] = useState([]);
  const [auther, setAuther] = useState({});
  const [isLogged, setLogged] = useState(false);


  useEffect(() => {
    // Use Effect Function
    const getBlogs = async () => {
      await axios.get(`${process.env.REACT_APP_API}/blog/getblogs?auther=${userID}`).then(res => { setBlogs(res.data) });
    }; getBlogs();
    const getAuther = async () => {
      try {
        await axios.post(`${process.env.REACT_APP_API}/auth/getauther?username=${userID}`).then(res => { setAuther(res.data) });
      } catch (err) { };
    }; getAuther();
    if (user.username === userID) { setLogged(true); };
  }, [user, userID]);

  return (
    <div className='account-section'>
      <LeftSection blogs={blogs} />
      <RightSection auther={auther} isLogged={isLogged} />
    </div>
  );
};

export default AccountSection;