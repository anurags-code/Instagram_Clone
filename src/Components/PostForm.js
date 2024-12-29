import React from 'react'
import './PostForm.css'
import { useState } from 'react'
// import { Link } from 'react-router-dom'   

const PostForm = ({updateNewPost}) => {
 

 

  const addPost= (data)=>{
    
    let storedPost = JSON.parse(localStorage.getItem("posts")) || [];
    const newPostArray = [...storedPost,data]
    console.log( newPostArray );


    localStorage.setItem("posts",JSON.stringify(newPostArray))
  }

    const [imageUrl,setImageUrl] = useState("")
    const [caption,setCaption] = useState("")


        function submitHandler(e) {
         
            e.preventDefault()
            // console.log(imageurl,caption)
            addPost({imageUrl,caption})
            setImageUrl("")
            setCaption("")
            updateNewPost()
            
        }
    return (
    <div className='form-container' >
      {/* <p>INSTAGRAM POSTS</p> */}
      <form onSubmit={submitHandler} className='form-container1'>
        <div className='form-group'>
            <label htmlFor='imageurl' className='lab'> Image URL</label>
            <input type='text'  value={imageUrl} onChange={(e)=>{setImageUrl(e.target.value)}} className='form-control'></input>
        </div>
        <div className='form-group'>
            <label htmlFor='caption' className='lab'>Caption</label>
            <input type='text' value={caption} onChange={(e)=>{setCaption(e.target.value)}} className='form-control'></input>
        </div>
        <button type='submit' className='btn btn1 btn-primary'>Upload Post</button>
      </form>
    {/* <Link to="/PostForm">signup</Link> */}
    </div>
  )
}

export default PostForm
