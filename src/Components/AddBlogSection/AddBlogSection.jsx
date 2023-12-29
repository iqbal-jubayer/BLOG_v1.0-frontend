import React, { useState } from 'react'
import axios from 'axios'

import './AddBlogSection.css'

const AddBlogSection = () => {
	const [blog, setBlog] = useState({
		"title": "",
		"topic": "General",
		"description": ""
	})

	// <--HANDLE FUNCTION
	const HandleChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		setBlog({ ...blog, [name]: value })
	}

	const HandleSubmit = async (e) => {
		e.preventDefault();
		console.log(blog)
		await axios.post(`${process.env.REACT_APP_API}/blog/createblog`, blog, { headers: { "Content-Type": "application/json", "auth-token": localStorage.getItem('auth-token') } })
			.then(res => { console.log(res) })
			.catch(err => { console.log(err) });
		window.location.assign('/');
	}
	// HANDLE FUNCTION-->

	return (
		<div className='add-blog-section base-bg-1'>
			<div className="add-blog-items">
				<h2>Create Blog</h2>
			</div>

			<form className='add-blog-items' action="POST" onSubmit={HandleSubmit}>
				<div className="add-blog-form-items">
					<input type="text" className="base-input" placeholder='Title' name='title' onChange={HandleChange} minLength={3} />
				</div>

				<div className="add-blog-form-items">
					<div className="topic-container">
						<label htmlFor="topic">Topic: </label>
						<select name="topic" id="select-topic" onChange={HandleChange}>
							<option value="General">General</option>
							<option value="Food">Food</option>
							<option value="Travel">Travel</option>
							<option value="Health and fitness">Health and fitness</option>
							<option value="Lifestyle">Lifestyle</option>
							<option value="Fashion and beauty">Fashion and beauty</option>
							<option value="Photography">Photography</option>
							<option value="Personal">Personal</option>
							<option value="Music">Music</option>
							<option value="Business">Business</option>
							<option value="IT">IT</option>
							<option value="Art and design">Art and design</option>
							<option value="Book and writing">Book and writing</option>
							<option value="Personal finance">Personal finance</option>
							<option value="Sports">Sports</option>
							<option value="News">News</option>
							<option value="Movie">Movie</option>
							<option value="Religion">Religion</option>
							<option value="Political">Political</option>
						</select>
					</div>
				</div>

				<div className="add-blog-form-items">
					<textarea name="description" id="blog-description" cols="30" rows="10" onChange={HandleChange} minLength={10}></textarea>
				</div>

				<div className="add-blog-form-items">
					<button className="btn">Share</button>
				</div>

			</form>
		</div>
	)
}

export default AddBlogSection