import React, { useState, useEffect } from "react";
import { getAuthContext } from "../../context/authContext";
import { doc, getDoc } from "firebase/firestore";
import { auth, database } from "../../../firebaseConfig";
import styles from "./Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Buttons from "../../Components/Buttons/Buttons";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { user } = getAuthContext();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(database, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log("user not found");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserData();
  }, [user]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.profileContainer}>
        <div className={styles.profileDetailsContainer}>
          <h2 className={styles.title}>Profile Details</h2>
          <FontAwesomeIcon
            icon={faUser}
            className={styles.profileIcon}
          ></FontAwesomeIcon>

          <p>
            <strong>First name: </strong> {userData?.firstname}
          </p>
          <p>
            <strong>Last name: </strong> {userData?.lastname}
          </p>
          <p>
            <strong>Date of Birth: </strong> {userData?.dateOfBirth}
          </p>
          <p>
            <strong>E-mail: </strong> {userData?.email}
          </p>
          <p>
            <strong>Account created at: </strong>{" "}
            {userData?.createdAt
              ? new Date(userData.createdAt.toDate()).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <strong>Last sign in: </strong>{" "}
            {auth.currentUser.metadata.lastLoginAt
              ? new Date(
                  Number(auth.currentUser.metadata.lastLoginAt)
                ).toLocaleString()
              : "N/A"}
          </p>
          {/* to be fixed */}

          <form>
            <fieldset className={styles.formWrapper}>
              <legend>Personal Goal</legend>
              <p>
                <strong>Favorite Book: </strong> {userData?.favoriteBook}
              </p>
              <div className={styles.bookGoalContainer}>
                <label htmlFor="bookGoal">Book goal:</label>
                <input
                  type="number"
                  id="bookGoal"
                  name="bookGoal"
                  className={styles.bookGoalInput}
                />
              </div>

              <p>
                <strong>Books read: </strong>
              </p>
              <Buttons className={styles.editButton}>Edit</Buttons>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
