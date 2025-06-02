import React, { useState, useEffect } from "react";
import { getAuthContext } from "../../context/authContext";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { auth, database } from "../../../firebaseConfig";
import styles from "./Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Buttons from "../../Components/Buttons/Buttons";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  const { user } = getAuthContext();
  const [totalReadBooks, setTotalReadBooks] = useState("");
  const [bookGoal, setBookGoal] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(database, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          setBookGoal(data.bookGoal || "");
          // setUserData(userDoc.data());
        } else {
          console.log("user not found");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserData();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const fetchReadBooks = async () => {
      try {
        const readBooksSnapShot = await getDocs(
          collection(database, "users", user.uid, "readBooks")
        );
        setTotalReadBooks(readBooksSnapShot.size);
      } catch (error) {
        console.log("failed fetching read books", error);
      }
    };
    fetchReadBooks();
  }, [user]);

  const handleBookGoalChange = (e) => {
    setBookGoal(e.target.value);
  };

  const handleSaveBookGoal = async () => {
    if (!user) return;
    try {
      const userRef = doc(database, "users", user.uid);
      await setDoc(userRef, { ...userData, bookGoal }, { merge: true });
      setIsEditing(false);
    } catch (error) {
      console.log("error saving book goal", error);
    }
  };

  if (!user) {
    return <p>Loading user profile...</p>;
  }

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
            {auth.currentUser?.metadata?.lastLoginAt
              ? new Date(
                  Number(auth.currentUser.metadata.lastLoginAt)
                ).toLocaleString()
              : "N/A"}
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            <fieldset className={styles.formWrapper}>
              <legend>Personal Goal</legend>
              <p>
                <strong>Favorite Book: </strong> {userData?.favoriteBook}
              </p>
              <p>
                <strong>Books read: </strong> {totalReadBooks}
              </p>
              <div className={styles.bookGoalContainer}>
                <label htmlFor="bookGoal">Book goal:</label>

                {isEditing ? (
                  <input
                    type="number"
                    id="bookGoal"
                    name="bookGoal"
                    value={bookGoal}
                    onChange={handleBookGoalChange}
                    className={styles.bookGoalInput}
                  />
                ) : (
                  <span>{bookGoal || "No goal set"} </span>
                )}
              </div>
              {isEditing ? (
                <Buttons
                  className={styles.editButton}
                  onClick={handleSaveBookGoal}
                >
                  Save Goal
                </Buttons>
              ) : (
                <Buttons
                  className={styles.editButton}
                  onClick={() => setIsEditing(true)}
                >
                  Edit Goal
                </Buttons>
              )}
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
