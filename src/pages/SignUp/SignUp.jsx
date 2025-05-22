import React from "react";
import styles from "./SignUp.module.css";
import Buttons from "../../Components/Buttons/Buttons";

const SignUp = () => {
  // remember add value to the input fields
  return (
    <div className={styles.formWrapper}>
      <form className={styles.signUpForm} noValidate>
        <h2 className={styles.formHeader}>Sign Up 🔖</h2>
        <fieldset className={styles.formGroup}>
          <legend className={styles.formGroupTitle}>
            Personal Information
          </legend>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="lastname"
            placeholder="Please enter your first name"
            maxLength={50}
            className={styles.formInput}
          />
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            maxLength={50}
            placeholder="Please enter your last name"
            className={styles.formInput}
          />
          <label htmlFor="lastname">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            className={styles.formInput}
          />
          <label htmlFor="favoriteBook">Favorite Book? 📖</label>
          <input
            type="text"
            name="favoriteBook"
            id="favoriteBook"
            maxLength={50}
            className={styles.formInput}
          />
        </fieldset>

        {/* second fieldset */}
        <fieldset className={styles.formGroup}>
          <legend className={styles.formGroupTitle}>Account Details</legend>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.formInput}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.formInput}
            maxLength={50}
            placeholder="Please enter a password"
          />

          <label htmlFor="confirmPassword">Password</label>
          <input
            type="confirmPassword"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-enter password"
            className={styles.formInput}
            maxLength={50}
          />
        </fieldset>
        <Buttons className={styles.createAccountButton}>Create Account</Buttons>
      </form>
    </div>
  );
};

export default SignUp;
