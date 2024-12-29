// import React, { useState } from "react";
// import "./Modal.css"; // Make sure to include some basic styling
// import PostForm from "./PostForm";

// function Modal({ show, onClose, children }) {
//   // const [newPost, setNewPost] = useState(true);

//   // function updateNewPost() {
//   //   setNewPost((prev) => !prev);
//   // }

//   // const addPost = (data) => {
//   //   let storedPost = JSON.parse(localStorage.getItem("posts")) || [];
//   //   const newPostArray = [...storedPost, data];
//   //   console.log(newPostArray);

//   //   localStorage.setItem("posts", JSON.stringify(newPostArray));
//   // };

//   if (!show) {
//     return null;
//   }

//   return (
//     <>
//       <div className="modal-backdrop">
//         <div className="modal-content">
//           <button className="modal-close" onClick={onClose}>
//             &times;
//           </button>
//           {children}
//         </div>
//       </div>
//       <div></div>
//     </>
//   );
// }

// export default Modal;
