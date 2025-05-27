import React, { useState } from "react";
import styles from "./SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import Buttons from "../../Components/Buttons/Buttons";
import useSignInValidation from "../../hooks/useSignInValidation";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import Modal from "../../Components/Modal/Modal";

const SignIn = () => {
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });

  const { validateSignIn, signInErrors } = useSignInValidation();
  const navigate = useNavigate();
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignInFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateSignIn(signInFormData)) {
      console.log("form is not valid");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signInFormData.email,
        signInFormData.password
      );

      const user = userCredential.user;
      console.log("successfully signed in", user);
      navigate("/book-main-page");

      setSignInFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePasswordReset = async (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    e.preventDefault();
    if (!resetEmail.trim()) {
      setResetMessage("Email adress is required");
      return;
    } else if (!emailRegex.test(resetEmail.trim())) {
      setResetMessage("Please enter a valid email adress");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      console.log("password reset sent");
      setResetMessage(
        "Password reset email has been sent. Please check your inbox 📧"
      );
      setResetEmail("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.signInForm} noValidate onSubmit={handleSignIn}>
        <h2 className={styles.formHeader}>Sign In 📚</h2>
        <fieldset className={styles.formGroup}>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email adress"
            className={styles.formInput}
            value={signInFormData.email}
            onChange={handleInputChange}
          />
          {signInErrors && (
            <p className={styles.errorMessage}>{signInErrors.email}</p>
          )}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className={styles.formInput}
            value={signInFormData.password}
            onChange={handleInputChange}
          />
          {signInErrors && (
            <p className={styles.errorMessage}>{signInErrors.password}</p>
          )}
        </fieldset>
        <Buttons className={styles.signInButton}>Sign In</Buttons>
        <p>
          Dont have an account?{" "}
          <Link to="/sign-up" className={styles.signUpLink}>
            Sign up here
          </Link>
        </p>
        <p>
          Forgot password?{" "}
          <Buttons
            className={styles.forgotPasswordButton}
            type="button"
            onClick={() => setShowForgotPasswordModal(true)}
          >
            Reset here
          </Buttons>
        </p>
      </form>

      {/* ----------------Open modal to reset the password ---- */}
      {showForgotPasswordModal && (
        <Modal>
          <form className={styles.resetContainer}>
            <p>
              Enter your Email adress and press "reset". You will then get an
              email with instructions to reset your password. Follow the link in
              the e.mail to set new password for your account.{" "}
            </p>

            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="resetEmail"
              name="resetEmail"
              placeholder="Enter your email adress"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className={styles.resetFormInput}
            />

            <div className={styles.resetButtonContainer}>
              <Buttons
                className={styles.resetPasswordButton}
                onClick={handlePasswordReset}
              >
                Reset Password
              </Buttons>
              <Buttons
                className={styles.closeButton}
                type="button"
                onClick={() => {
                  setShowForgotPasswordModal(false);
                  setResetMessage("");
                  setResetEmail("");
                }}
              >
                Close
              </Buttons>
            </div>
            {resetMessage && (
              <p className={styles.errorMessage}>{resetMessage}</p>
            )}
          </form>
        </Modal>
      )}
    </div>
  );
};

export default SignIn;
