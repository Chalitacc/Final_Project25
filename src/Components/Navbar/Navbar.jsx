import React from "react";
import styles from "./Navbar.module.css";
import Buttons from "../Buttons/Buttons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../../firebaseConfig";
import { getAuthContext } from "../../context/authContext";
import { signOut } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  const { user } = getAuthContext();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/sign-in");
      console.log("user signed out");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <nav className={styles.navbar}>
      <div>
        <div className={styles.title}>
          <h1>Shelfie</h1>
        </div>
        <div className={styles.firstRow}>
          {user ? (
            <>
              <SearchBar></SearchBar>
              <div className={styles.ButtonLinkGroup}>
                <Buttons
                  onClick={handleSignOut}
                  className={styles.signInButton}
                >
                  Sign Out
                </Buttons>
                <Link to="profile" className={styles.profileButton}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faUser}
                    className={styles.profileIcon}
                  ></FontAwesomeIcon>
                </Link>
              </div>
            </>
          ) : (
            <Link className={styles.signInLink} to="/sign-in">
              Sing In
            </Link>
          )}
        </div>
        <div>
          <NavLink to="/contact" className={styles.contactLink}>
            Contact
          </NavLink>
          <NavLink to="/book-main-page">Home</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
