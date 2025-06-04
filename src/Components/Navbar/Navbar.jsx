import React, { useState } from "react";
import styles from "./Navbar.module.css";
import Buttons from "../Buttons/Buttons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { getAuthContext } from "../../context/authContext";
import { signOut } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = ({ children }) => {
  const { user } = getAuthContext();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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
      <div className={styles.navContainer}>
        <div className={styles.title}>
          <Link to="/book-main-page" className={styles.titleLink}>
            <h1>Shelfie</h1>
          </Link>
        </div>

        <div className={styles.searchBarContainer}>{children}</div>

        <div className={styles.burgerMenuAndSignIn}>
          {user ? (
            <>
              <div className={styles.buttonLinkGroup}>
                <Buttons
                  onClick={handleSignOut}
                  className={styles.signInButton}
                >
                  Sign Out
                </Buttons>
              </div>
            </>
          ) : (
            <Link className={styles.signInLink} to="/sign-in">
              Sing In
            </Link>
          )}

          <button
            className={styles.burger}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <FontAwesomeIcon
              icon={menuOpen ? faTimes : faBars}
            ></FontAwesomeIcon>
          </button>
          <div className={`${styles.menu} ${menuOpen ? styles.show : ""}`}>
            {user ? (
              <>
                <NavLink to="/book-main-page" className={styles.navLink}>
                  Home
                </NavLink>
                <NavLink to="/profile" className={styles.profileLink}>
                  Profile
                </NavLink>
              </>
            ) : null}

            <NavLink to="/contact" className={styles.navLink}>
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
