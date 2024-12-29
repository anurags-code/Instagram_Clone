// import React from 'react'
// import { useState, useEffect } from 'react';


// const PostList = ({newPost,updateNewPost}) => {
//   const [posts,setPosts] = useState([]);

//   useEffect (() =>{
//     const storedPosts = localStorage.getItem("posts");
//     // console.log(storedPosts);

//     const parsedposts = JSON.parse(storedPosts);
//     // console.log(parsedposts);
//     setPosts(parsedposts);
//     // updateNewPost()

  
//   }, [newPost]);

//   function likePost(index) {
//     let id = index.target.getAttribute("data-id")

//     console.log(id);
    
//     const storedPost = JSON.parse(localStorage.getItem("posts"))
//     console.log(storedPost); 
//     // const likepost = store

//   }

//   function removePost(index) {
//     // console.log(index);

//     let id = index.target.getAttribute("data-id")
//     console.log(id);
//     const storedPost = JSON.parse(localStorage.getItem("posts"))
//     const filteredpost = storedPost.filter((_,i) => i !== parseInt(id));
//     console.log(filteredpost);

//      localStorage.setItem("posts",JSON.stringify(filteredpost))
//      updateNewPost()
     
//   }

   

//   return (
//     <div className='card-list'>

//       {
//         posts && posts.map((post,index) => (
//           <div className="card">
//         <img src={post.imageUrl} />
//         <div className="card-body">
//           <p className="card-test">{post.caption}</p>
//           <div className="buttons">
//             <button data-id={index} onClick={likePost} className="btn "><i class="fa-regular fa-heart" data-id={index} onClick={likePost} ></i></button>
//             <button data-id={index} className="btn " onClick={removePost}><i class="fa-solid fa-trash"  data-id={index} onClick={removePost}></i></button>
//             {/* <span data-id={index}  onClick={removePost}><i class="fa-regular fa-heart" ></i></span> */}
//             <span className="j">1 Likes</span>
//           </div>
//         </div>
//        </div>
//         ) )
//       } 

       
        
//     </div>
//   )
// }

// export default PostList
