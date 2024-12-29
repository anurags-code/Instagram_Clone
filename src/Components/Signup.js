import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();


  const [email, SetEmail] = useState("");
  const [fullname, Setfullname] = useState("");
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");

  async function submithandler(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://insta-backend-hr3a.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: fullname,
            email: email,
            password: password,
            userName: username,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.message === 'Registered successfully') {
        navigate("/");
      }
    } catch (err) {}
    
  }

  return (
    <div>
      <div class="container">
        <div class="box">
          <div class="heading"></div>
          <form class="login-form">
            <p id="sig">Sign up to see photos and videos from your friends.</p>
            <Link class="signup" to="/homepage">
              <button class="login-button" title="login">
                Log in with Facebook
              </button>
            </Link>
            <div class="separator">
              <div class="line"></div>
              <p>OR</p>
              <div class="line"></div>
            </div>
            <div class="field">
              <input
                id="username"
                type="name"
                value={email}
                onChange={(e) => SetEmail(e.target.value)}
                placeholder="Phone number, username, or email"
              />
              <label className="label" for="username">
                Mobile Number or Email
              </label>
            </div>
            <div class="field">
              <input
                id="username"
                type="name"
                value={fullname}
                onChange={(e) => Setfullname(e.target.value)}
                placeholder="Phone number, username, or email"
              />
              <label className="label" for="username">
                Full Name
              </label>
            </div>
            <div class="field">
              <input
                id="username"
                type="name"
                value={username}
                onChange={(e) => SetUsername(e.target.value)}
                placeholder="Phone number, username, or email"
              />
              <label className="label" for="username">
                UserName
              </label>
            </div>
            <div class="field">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => SetPassword(e.target.value)}
                placeholder="password"
              />
              <label className="label" for="password">
                Password
              </label>
            </div>
            <button class="login-button" onClick={submithandler} title="login">
              Sign Up
            </button>
            <br></br>
            <div class="separator">
              <div class="line"></div>
              {/* <p>OR</p> */}
              <div class="line"></div>
            </div>

            {/* <p id='sig'>People who use our service may have uploaded your contact information to Instagram.Learn More</p> */}
            <div class="other">
              <button class="fb-login-btn" type="button">
                <i class="fa fa-facebook-official fb-icon"></i>
                <span class="">Log in with Facebook</span>
              </button>
              <a class="forgot-password" href="#b">
                Forgot password?
              </a>
            </div>
          </form>
        </div>
        <div class="box">
          <p>
            {" "}
            Have an account?{" "}
            <Link class="signup" to="/">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
