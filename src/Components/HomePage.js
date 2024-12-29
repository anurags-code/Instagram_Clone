import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDeleteForever } from "react-icons/md";
import Navbar from "./Navbar";


function HomePage({ setIsLogin, updateNewPost, newPost }) {
  const currentUserId = localStorage.getItem("userId");
  const currentUserName = localStorage.getItem("userName");

  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const [isCommentBox, setIsCommentBox] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://insta-backend-hr3a.onrender.com/allposts",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };
    fetchPosts();
  }, [newPost]);

  const likePost = async (postId) => {
    try {
      const response = await fetch(
        "https://insta-backend-hr3a.onrender.com/like",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ postId }),
        }
      );
      const data = await response.json();
      toast.success("Liked Successfully!");
      updateNewPost();
    } catch (err) {
      console.log(err);
    }
  };

  const unlikePost = async (postId) => {
    try {
      const response = await fetch(
        "https://insta-backend-hr3a.onrender.com/unlike",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ postId }),
        }
      );
      const data = await response.json();
      toast.success("Unliked Successfully!");
      updateNewPost();
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await fetch(
        `https://insta-backend-hr3a.onrender.com/deletePost/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      toast.success("Post Deleted Successfully!");
      updateNewPost();
    } catch (err) {
      console.log(err);
    }
  };

  const commentPost = async (postId) => {
    try {
      const response = await fetch(
        "https://insta-backend-hr3a.onrender.com/comment",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            text: comment,
            postId,
          }),
        }
      );
      const data = await response.json();
      toast.success("Commented Successfully!");
      setComment("");
      updateNewPost();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar setIsLogin={setIsLogin} updateNewPost={updateNewPost} />
      <div style={styles.homeContainer}>
        <div style={styles.sidebar}>
          <p style={styles.sidebarHeader}>Your Profile</p>
          <div style={styles.profileContainer}>
            <Link to={`/profile?userId=${currentUserId}`} style={styles.profileLink}>
              <img
                style={styles.profileImg}
                src="https://cdn-icons-png.flaticon.com/512/2919/2919906.png"
                alt="Profile"
              />
              <button style={styles.profileButton}>{currentUserName}</button>
            </Link>
          </div>
        </div>

        <div style={styles.feedContainer}>
          {posts.map((post) => (
            <div key={post._id} style={styles.feedCard}>
              <div style={styles.feedHeader}>
                <img
                  src={post.postedBy.Photo || "https://cdn-icons-png.flaticon.com/512/2919/2919906.png"}
                  alt="User"
                  style={styles.feedUserIcon}
                />
                <Link to={`/profile?userId=${post.postedBy._id}`} style={styles.feedUserName}>
                  {post.postedBy.name}
                </Link>
                <MdDeleteForever style={styles.deleteIcon} onClick={() => deletePost(post._id)} />
              </div>
              <img src={post.photo} alt="Post" style={styles.feedImage} />
              <div style={styles.feedActions}>
                <div style={styles.actionItem}>
                  <FaHeart
                    style={post.likes.includes(currentUserId) ? styles.redIcon : styles.actionIcon}
                    onClick={() =>
                      post.likes.includes(currentUserId) ? unlikePost(post._id) : likePost(post._id)
                    }
                  />
                  <span>{post.likes.length}</span>
                </div>
                <div style={styles.actionItem}>
                  <FaComment style={styles.actionIcon} onClick={() => setIsCommentBox(!isCommentBox)} />
                  <span>{post.comments.length}</span>
                </div>
                <FaShare style={styles.actionIcon} />
              </div>
              <div style={styles.feedCaption}>
                <span style={styles.feedUserName}>{post.postedBy.name}</span> {post.body}
              </div>
              <div style={isCommentBox ? styles.commentBoxOpen : styles.commentBoxHide}>
                {post.comments.map((commentDetail) => (
                  <div key={commentDetail._id} style={styles.commentItem}>
                    <p>{commentDetail.comment}</p>
                  </div>
                ))}
              </div>
              <div style={styles.commentInputContainer}>
                <input
                  type="text"
                  style={styles.commentInput}
                  placeholder="Add your comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button style={styles.commentButton} onClick={() => commentPost(post._id)}>
                  Post
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.suggestions}>
          <p style={styles.suggestionsHeader}>Suggestions For You</p>
          <div style={styles.suggestionItem}>
            <span>@black</span>
            <button style={styles.suggestionButton}>Add</button>
          </div>
          <div style={styles.suggestionItem}>
            <span>@jiya</span>
            <button style={styles.suggestionButton}>Add</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

const styles = {
  homeContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: "70px",
    padding: "10px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  sidebar: {
    flex: 1,
    maxWidth: "300px",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginRight: "20px",
  },
  sidebarHeader: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  profileContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  profileLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
  },
  profileImg: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  profileButton: {
    backgroundColor: "#0095f6",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  feedContainer: {
    flex: 3,
    maxWidth: "600px",
  },
  feedCard: {
    border: "1px solid #dbdbdb",
    borderRadius: "8px",
    marginBottom: "20px",
    backgroundColor: "#fff",
  },
  feedHeader: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
  },
  feedUserIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  feedUserName: {
    flex: 1,
    fontWeight: "bold",
    textDecoration: "none",
    color: "#262626",
  },
  deleteIcon: {
    cursor: "pointer",
    color: "red",
  },
  feedImage: {
    width: "100%",
    maxHeight: "400px",
    objectFit: "cover",
  },
  feedActions: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderTop: "1px solid #dbdbdb",
  },
  actionItem: {
    display: "flex",
    alignItems: "center",
    marginRight: "10px",
  },
  actionIcon: {
    fontSize: "20px",
    cursor: "pointer",
    marginRight: "5px",
  },
  redIcon: {
    fontSize: "20px",
    cursor: "pointer",
    marginRight: "5px",
    color: "red",
  },
  feedCaption: {
    padding: "10px",
    borderTop: "1px solid #dbdbdb",
  },
  commentBoxOpen: {
    padding: "10px",
    borderTop: "1px solid #dbdbdb",
  },
  commentBoxHide: {
    display: "none",
  },
  commentInputContainer: {
    padding: "10px",
    display: "flex",
    alignItems: "center",
    borderTop: "1px solid #dbdbdb",
  },
  commentInput: {
    flex: 1,
    border: "none",
    outline: "none",
  },
  commentButton: {
    backgroundColor: "#0095f6",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  suggestions: {
    flex: 1,
    maxWidth: "300px",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginLeft: "20px",
  },
  suggestionsHeader: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  suggestionItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  suggestionButton: {
    backgroundColor: "#0095f6",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default HomePage;
