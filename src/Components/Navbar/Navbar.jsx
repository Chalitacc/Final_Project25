import React from "react";
import styles from "./Navbar.module.css";
import Buttons from "../Buttons/Buttons";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div>
        <div className={styles.title}>
          <h1>Shelfie</h1>
        </div>
        <div className={styles.signInButton}>
          <Buttons>Sign In</Buttons>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
