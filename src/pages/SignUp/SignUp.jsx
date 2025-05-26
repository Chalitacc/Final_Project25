import React, { useState } from "react";
import styles from "./SignUp.module.css";
import Buttons from "../../Components/Buttons/Buttons";
import { useSignUpValidation } from "../../hooks/useSignUpValidation";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { database } from "../../../firebaseConfig";

const SignUp = () => {
  const [signUpFormData, setSignUpFormData] = useState({
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    email: "",
    favoriteBook: "",
    password: "",
    confirmPassword: "",
  });

  const { validate, errors } = useSignUpValidation();
  const { signUp, signUpError, user } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(signUpFormData)) {
      console.log("Form is not valid!");
      return;
    }
    try {
      const userCredential = await signUp(
        signUpFormData.email,
        signUpFormData.password
      );
      const user = userCredential.user;
      console.log("user create success", userCredential.user);

      await setDoc(doc(database, "users", user.uid), {
        uid: user.uid,
        firstname: signUpFormData.firstname,
        lastname: signUpFormData.lastname,
        dateOfBirth: signUpFormData.dateOfBirth || "",
        favoriteBook: signUpFormData.favoriteBook,
        email: user.email,
        createdAt: serverTimestamp(),
      });

      navigate("/verify-email");
      console.log("user added to database");

      setSignUpFormData({
        firstname: "",
        lastname: "",
        dateOfBirth: "",
        email: "",
        favoriteBook: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log("error signing up", error);
    }
  };
  // remember add value to the input fields
  return (
    <div className={styles.formWrapper}>
      <form className={styles.signUpForm} noValidate onSubmit={handleSubmit}>
        <h2 className={styles.formHeader}>Sign Up 🔖</h2>
        <fieldset className={styles.formGroup}>
          <legend className={styles.formGroupTitle}>
            Personal Information
          </legend>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Please enter your first name"
            maxLength={50}
            value={signUpFormData.firstname}
            onChange={handleInputChange}
            className={styles.formInput}
          />
          {errors && <p className={styles.errorMessage}>{errors.firstname}</p>}

          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            maxLength={50}
            placeholder="Please enter your last name"
            value={signUpFormData.lastname}
            onChange={handleInputChange}
            className={styles.formInput}
          />
          {errors && <p className={styles.errorMessage}>{errors.lastname}</p>}

          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            value={signUpFormData.dateOfBirth}
            onChange={handleInputChange}
            className={styles.formInput}
          />
          <label htmlFor="favoriteBook">Favorite Book? 📖</label>
          <input
            type="text"
            name="favoriteBook"
            id="favoriteBook"
            maxLength={50}
            value={signUpFormData.favoriteBook}
            onChange={handleInputChange}
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
            value={signUpFormData.email}
            onChange={handleInputChange}
            className={styles.formInput}
          />
          {errors && <p className={styles.errorMessage}>{errors.email}</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.formInput}
            value={signUpFormData.password}
            onChange={handleInputChange}
            placeholder="Please enter a password"
          />
          {errors && <p className={styles.errorMessage}>{errors.password}</p>}

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-enter password"
            value={signUpFormData.confirmPassword}
            onChange={handleInputChange}
            className={styles.formInput}
            maxLength={50}
          />
          {errors && (
            <p className={styles.errorMessage}>{errors.confirmPassword}</p>
          )}
        </fieldset>
        <Buttons className={styles.createAccountButton}>Create Account</Buttons>
      </form>
    </div>
  );
};

export default SignUp;
