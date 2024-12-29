// import logo from './logo.svg';
import './App.css';
import'bootstrap/dist/css/bootstrap.min.css'
import PostForm from './Components/PostForm'
import PostList from './Components/PostList';
import { useState } from 'react';
import { BrowserRouter,Route,  Routes } from 'react-router-dom';
import InstaLogin from './Components/InstaLogin';
import Signup from './Components/Signup';
import HomePage from './Components/HomePage';
// import Navbar from './Components/Navbar';
import MyProfile from './Components/MyProfile';
import { Navigate } from 'react-router-dom';
import LogOut from './Components/Logout';




function App() {


  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"))
  console.log(isLogin);


  const [newPost, setNewPost] = useState(true)

  function updateNewPost() {
    setNewPost((prev)=> !prev)
  }

 

  const addPost= (data)=>{
    
    let storedPost = JSON.parse(localStorage.getItem("posts")) || [];
    const newPostArray = [...storedPost,data]
    console.log( newPostArray );


    localStorage.setItem("posts",JSON.stringify(newPostArray))
  }
  

  return (
  <>
  {/* <InstaLogin/> */}
  {/* <Signup></Signup> */}
    
  <BrowserRouter>
  {/* <Link to="/PostForm">log in</Link> */}
      <Routes>
      <Route path="/list" element={ <PostList  />}></Route>
      <Route path="/instalogin" element={isLogin?<Navigate to={"/"}></Navigate>: <InstaLogin setIsLogin={setIsLogin}></InstaLogin>}></Route> 
      <Route path="/postform" element={<PostForm addPost={addPost} updateNewPost={updateNewPost} />}></Route> 
      <Route path="/Signup" element={<Signup />}></Route>   
      <Route path="/" element={isLogin ?  <HomePage newPost={newPost} setIsLogin={setIsLogin} updateNewPost={updateNewPost}></HomePage>:<Navigate to={"/instalogin"}></Navigate>}></Route>  
      {/* <Route path="/myprofile" element={<MyProfile setIsLogin={setIsLogin} updateNewPost={updateNewPost}  />}></Route> */}
      {/* <Route path="/instalogin" element={<LogOut setIsLogin={setIsLogin} />}></Route> */}
      <Route path='/profile' element={<MyProfile setIsLogin={setIsLogin} updateNewPost={updateNewPost}  ></MyProfile>}></Route>
         
      </Routes>
    </BrowserRouter>
   
{/* <PostForm addPost={addPost} updateNewPost={updateNewPost} />
    <br></br>
    <PostList newPost= {newPost} updateNewPost={updateNewPost} />
    <BrowserRouter></BrowserRouter> */}
  </>
  );
}

export default App;
