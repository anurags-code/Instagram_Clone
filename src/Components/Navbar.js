// import React from "react";
// import { useState } from "react";
// import styles from "./Navbar.module.css";

// function Navbar() {
//   // adding the states
//   const [isActive, setIsActive] = useState(false);
//   //add the active class
//   const toggleActiveClass = () => {
//     setIsActive(!isActive);
//   };
//   //clean up function to remove the active class
//   const removeActive = () => {
//     setIsActive(false);
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <nav className={`${styles.navbar}`}>
//           {/* logo */}
//           <a href="#home" className={`${styles.logo}`}>
//           <i class="fa-brands fa-instagram"></i>{" "}
//           </a>
//           <ul className={`${styles.navMenu} ${isActive ? styles.active : ""}`}>

//             <li onClick={removeActive}>
//               <a href="#home" className={`${styles.navLink}`}>
//               <i class="fa-solid fa-house"></i>
//               </a>
//             </li>
//             <li onClick={removeActive}>
//               <a href="#home" className={`${styles.navLink}`}>
//               <i class="fa-solid fa-square-plus"></i>
//               </a>
//             </li>
//             <li onClick={removeActive}>
//               <a href="#home" className={`${styles.navLink}`}>
//               <i class="fa-regular fa-heart"></i>
//               </a>
//             </li>
//             <li onClick={removeActive}>
//               <a href="#home" className={`${styles.navLink}`}>
//               <i class="fa-brands fa-facebook-messenger"></i>
//               </a>
//             </li>
//           </ul>
//           <div
//             className={`${styles.hamburger} ${isActive ? styles.active : ""}`}
//             onClick={toggleActiveClass}
//           >
//             <span className={`${styles.bar}`}></span>
//             <span className={`${styles.bar}`}></span>
//             <span className={`${styles.bar}`}></span>
//           </div>
//         </nav>
//       </header>
//     </div>
//   );
// }

// export default Navbar;

import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import { AiOutlineHome, AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { BsMessenger } from "react-icons/bs";
import AddPost from "./AddPost";
import LogOut from "./Logout";

function Navbar({ handleOpen, setIsLogin, updateNewPost }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const currentUserName = localStorage.getItem("userName");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openAddPostModal = () => setIsAddPostModalOpen(true);
  const closeAddPostModal = () => setIsAddPostModalOpen(false);
  const toggleActiveClass = () => setIsActive(!isActive);
  const removeActive = () => setIsActive(false);

  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Search query:", searchQuery);
  };

  return (
    <>
      <div className={styles.navbar}>
        {/* Your Profile Section */}
        <div className={styles.profileSection}>
          <FaUserCircle className={styles.profileIcon} />
          <span className={styles.username}>{currentUserName}</span>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <AiOutlineSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </form>

        {/* Navigation Menu */}
        <ul className={`${styles.navMenu} ${isActive ? styles.active : ""}`}>
          <li onClick={removeActive}>
            <Link to="/" className={styles.navLink}>
              <AiOutlineHome />
            </Link>
          </li>
          <li>
            <span className={styles.navLink}>
              <FaPlus
                style={{ fontSize: "28px", cursor: "pointer" }}
                onClick={openAddPostModal}
              />
            </span>
          </li>
          <li onClick={removeActive}>
            <Link to="/notifications" className={styles.navLink}>
              <AiOutlineHeart />
            </Link>
          </li>
          <li onClick={removeActive}>
            <Link to="/messages" className={styles.navLink}>
              <BsMessenger />
            </Link>
          </li>
          <li onClick={openModal}>
            <CiLogout
              style={{
                fontSize: "28px",
                color: "red",
                cursor: "pointer",
              }}
            />
          </li>
        </ul>

        {/* Hamburger Menu */}
        <div
          className={`${styles.hamburger} ${isActive ? styles.active : ""}`}
          onClick={toggleActiveClass}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
      </div>

      <AddPost
        closeModal={closeAddPostModal}
        isModalOpen={isAddPostModalOpen}
        updateNewPost={updateNewPost}
      />
      <LogOut
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        setIsLogin={setIsLogin}
      />
    </>
  );
}

export default Navbar;

