import React from "react";
import styles from "./Navbar.module.css";
import Buttons from "../Buttons/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebaseConfig";
import { getAuthContext } from "../../context/authContext";
import { signOut } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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
        <div className={styles.signInButton}>
          {user ? (
            <>
              <Buttons onClick={handleSignOut}>Sign Out</Buttons>
              <Link to="profile" className={styles.profileButton}>
                {" "}
                <FontAwesomeIcon
                  icon={faUser}
                  className={styles.profileIcon}
                ></FontAwesomeIcon>
              </Link>
            </>
          ) : (
            <Link>Sing In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
