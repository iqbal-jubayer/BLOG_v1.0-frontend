import React, { useEffect, useLayoutEffect, useState } from "react";
import blogContext from "./BlogContext";
import axios from "axios";

const BlogState = (props) => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState({})
    const [isAuth, setIsAuth] = useState(false)

    const checkAuthentication = async () => {
        if (localStorage.getItem('isAuth') != null) {
            setIsAuth(true);
        }

        if (localStorage.getItem('auth-token') != null) {
            await axios.post(`${process.env.REACT_APP_API}/auth/getuser`, {}, { headers: { "auth-token": localStorage.getItem('auth-token') } }).then(res => { setUser(res.data) }).catch(err => { localStorage.removeItem('isAuth'); localStorage.removeItem('auth-token'); });
        }
    }

    const getBlogs = () => {
        axios.get(`${process.env.REACT_APP_API}/blog/getblogs`)
            .then(blog => { setBlogs(blog.data); })
            .catch(err => console.log(err))

    }

    useLayoutEffect(() => {
        checkAuthentication();
    }, [])

    useEffect(() => {
        getBlogs();
    }, [])

    const values = { blogs, setBlogs, user, setUser, isAuth, setIsAuth, checkAuthentication, getBlogs };

    return (
        <blogContext.Provider value={values}>
            {props.children}
        </blogContext.Provider>
    )
}

export default BlogState;