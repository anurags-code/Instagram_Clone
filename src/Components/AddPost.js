import React, { useState } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import "./AddPost.css"
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

export default function AddPost({ isModalOpen, closeModal, updateNewPost }) {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");

  async function addPost() {
    try {
      const response = await fetch(
        "https://insta-backend-hr3a.onrender.com/createPost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            body: caption,
            pic: imageUrl,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      setCaption("");
      setImageUrl("");

      closeModal();
      updateNewPost();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button
          style={{
            fontWeight: "900",
            fontSize: "20px",
            background: "none",
            border: "none",
            position: "absolute",
            right: "5px",
            top: "5px",
          }}
          onClick={closeModal}
        >
          <IoMdClose />
        </button>

        <div className="form-container">
          <div className="form">
            <h2 className="adp">Add Post</h2>

            <div>
                <h6>imageUrl</h6>
              <input
                className="border border-primary inp"
                type="imageUrl"
                name="imageUrl"
                id="imageUrl"
                placeholder="Paste you url here"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                }}
              />
            </div>

            <div>
            <h6>caption</h6>
              <input
                className="border border-primary inp"
                type="caption"
                name="caption"
                id="caption"
                placeholder="caption"
                value={caption}
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
              />
            </div>
            <br />
            <input
              className="btn btn-outline-dark"
              type="submit"
              id="submit-btn"
              value="Post"
              onClick={addPost}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
