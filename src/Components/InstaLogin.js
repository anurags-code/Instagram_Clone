import React from "react";
import "./InstaLogin.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InstaLogin({setIsLogin}) {
  const navigate = useNavigate();
  

  const [email, SetEmail] = useState("");
  // const [username,SetUsername]= useState("");
  const [password, SetPassword] = useState("");

  async function submithandler(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://insta-backend-hr3a.onrender.com/signIn",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            // userName: username,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.token) {
        console.log("Succesful Login")
        localStorage.setItem("token",data.token)
        localStorage.setItem("userId",data.user._id)  
        localStorage.setItem("userName",data.user.userName)  
        setIsLogin(true)
        navigate("/");
      }
      
    } catch (err) {}
  }
  return (
    <div className="body">
      <div class="container">
        <div class="box">
          <div class="heading"></div>
          <form class="login-form">
            <div class="field">
              <input
                id="username"
                type="name"
                onChange={(e) => SetEmail(e.target.value)}
                placeholder="Phone number, username, or email"
              />
              <label className="label" for="username">
                Phone number, username, or email
              </label>
            </div>
            <div class="field">
              <input
                id="password"
                onChange={(e) => SetPassword(e.target.value)}
                type="password"
                placeholder="password"
              />
              <label className="label" for="password">
                Password
              </label>
            </div>
            <button onClick={submithandler} class="login-button" title="login">
              Log In
            </button>

            <div class="separator">
              <div class="line"></div>
              <p>OR</p>
              <div class="line"></div>
            </div>
            <div class="other">
              <button class="fb-login-btn" type="button">
                <i class="fa fa-facebook-official fb-icon"></i>
                <span class="">Log in with Facebook</span>
              </button>
              <a class="forgot-password" href="#">
                Forgot password?
              </a>
            </div>
          </form>
        </div>
        <div class="box">
          <p>
            Don't have an account?{" "}
            <Link class="signup" to="/Signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default InstaLogin;
