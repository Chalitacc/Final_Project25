import React, { useEffect, useState } from "react";
import styles from "./VerifyEmail.module.css";
import { useNavigate } from "react-router-dom";
import Buttons from "../../Components/Buttons/Buttons";
import { auth } from "../../firebaseConfig";
import { sendEmailVerification } from "firebase/auth";

const VerifyEmail = () => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkVerificationStatus = async () => {
      await auth.currentUser.reload();
      setEmailVerified(auth.currentUser.emailVerified);

      if (auth.currentUser.emailVerified) {
        navigate("/book-main-page");
      }
    };
    const interval = setInterval(checkVerificationStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleResesndVerification = async () => {
    setError(null);
    try {
      await sendEmailVerification(auth.currentUser);
      setEmailSent(true);
    } catch (error) {
      setError("error re-sending verification");
    }
  };

  return (
    <div className={styles.wrapper}>
      {emailVerified ? (
        <h1>Email verified! Redirecting to the main page....</h1>
      ) : (
        <div className={styles.verifyContainer}>
          <h2>
            Please check your inbox and verify your email. After verifying, you
            will be automatically redirected to the main page{" "}
          </h2>
          <p>
            If you haven´t recieved the email, click on the button below to
            request a new verificatione email
          </p>
          <Buttons
            className={styles.resendButton}
            onClick={handleResesndVerification}
          >
            Resend verification email
          </Buttons>
          {emailSent && (
            <p>
              A new verification email has been sent. Please check your inbox
              now 📧
            </p>
          )}
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
