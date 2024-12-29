import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaUser,
  FaSearch,
  FaSignOutAlt,
  FaPlusCircle,
  FaHeart,
  FaComment,
  FaShare,
  FaTrashAlt,
} from "react-icons/fa";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
// import LogOut from "./Logout";

function MyProfile ()  {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [createPostModalIsOpen, setCreatePostModalIsOpen] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState("");
  const [newPostImage, setNewPostImage] = useState("");
  const queryParams = new URLSearchParams(window.location.search);
  const userId = queryParams.get("userId");
  

  // function navi(){
  //   navigate("/")
  // }
  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          "https://insta-backend-hr3a.onrender.com/user/" + userId,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, [userId]);

  const handleProfilePicChange = (e) => {
    setNewProfilePic(URL.createObjectURL(e.target.files[0]));
  };

  const handleNewPostImageChange = (e) => {
    setNewPostImage(URL.createObjectURL(e.target.files[0]));
  };

  const sidebarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "250px",
    height: "100vh",
    backgroundColor: "#f8f8f8",
    padding: "20px",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
  };

  const sidebarButtonStyle = {
    width: "100%",
    padding: "15px",
    margin: "10px 0",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#fafafa",
    color: "#262626",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s ease",
  };

  const iconStyle = {
    marginRight: "10px",
    fontSize: "20px",
  };

  const mainContentStyle = {
    marginLeft: "250px",
    padding: "20px",
    width: "calc(100% - 250px)",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const profileHeaderStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    width: "100%",
    maxWidth: "600px",
    justifyContent: "space-between",
  };

  const profilePictureStyle = {
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    overflow: "hidden",
    cursor: "pointer",
  };

  const profileInfoStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  const profileStatsStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "10px",
  };

  const profilePostsStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    width: "100%",
    maxWidth: "900px",
  };

  const postStyle = {
    position: "relative",
    width: "300px",
    height: "300px",
    boxSizing: "border-box",
    borderRadius: "10px",
    overflow: "hidden",
  };

  const postIconStyle = {
    position: "absolute",
    bottom: "10px",
    left: "10px",
    color: "white",
    cursor: "pointer",
    fontSize: "20px",
  };

  const deleteIconStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    color: "white",
    cursor: "pointer",
    fontSize: "20px",
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={sidebarStyle}>
        <button

          style={sidebarButtonStyle}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ddd")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fafafa")}
        >
          <FaHome style={iconStyle} /> Home
        </button>
        <button
          style={sidebarButtonStyle}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ddd")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fafafa")}
        >
          <FaSearch style={iconStyle} /> Search
        </button>
        <button
          style={sidebarButtonStyle}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ddd")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fafafa")}
        >
          <FaUser style={iconStyle} /> My Profile
        </button>
        <button
          style={sidebarButtonStyle}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ddd")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fafafa")}
          onClick={() => setCreatePostModalIsOpen(true)}
        >
          <FaPlusCircle style={iconStyle} /> Create Post
        </button>
        <button
          style={sidebarButtonStyle}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ddd")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fafafa")}
          // onClick={openModal} 
        >
          <FaSignOutAlt style={iconStyle} /> Logout
        </button>
      </div>

      <div style={mainContentStyle}>
        {user && (
          <div className="profile-page">
            <header style={profileHeaderStyle}>
              <div
                style={profilePictureStyle}
                onClick={() => setModalIsOpen(true)}
              >
                <img
                  src={
                    newProfilePic || user.user.Photo
                      ? newProfilePic || user.user.Photo
                      : "https://cdn-icons-png.flaticon.com/128/149/149071.png"
                  }
                  alt={`${user.user.userName}'s profile`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={profileInfoStyle}>
                <h1>{user.user.userName}</h1>
                <div style={profileStatsStyle}>
                  <span>
                    <strong>{user.post.length}</strong> posts
                  </span>
                  <span>
                    <strong>{user.user.followers.length}</strong> followers
                  </span>
                  <span>
                    <strong>{user.user.following.length}</strong> following
                  </span>
                </div>
                <p>{user.user.bio || "No bio available"}</p>
              </div>
            </header>
            <div style={profilePostsStyle}>
              {user.post.map((post, index) => (
                <div key={index} style={postStyle}>
                  <img
                    src={post.photo}
                    alt={`Post ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <FaHeart style={postIconStyle} />
                  <FaComment style={{ ...postIconStyle, left: "40px" }} />
                  <FaShare style={{ ...postIconStyle, left: "70px" }} />
                  <FaTrashAlt style={deleteIconStyle} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "10px",
            width: "300px",
          },
        }}
      >
        <h2>Change Profile Picture</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePicChange}
          style={{ margin: "10px 0" }}
        />
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "gray",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => setModalIsOpen(false)}
        >
          Save
        </button>
      </Modal>

      <Modal
        isOpen={createPostModalIsOpen}
        onRequestClose={() => setCreatePostModalIsOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "10px",
            width: "300px",
          },
        }}
      >
        <h2>Create New Post</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleNewPostImageChange}
          style={{ margin: "10px 0" }}
        />
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "gray",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => setCreatePostModalIsOpen(false)}
        >
          Save
        </button>
      </Modal>
      {/* <LogOut
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        // setIsLogin={setIsLogin}
      /> */}
    </div>
  );
};

export default MyProfile;
