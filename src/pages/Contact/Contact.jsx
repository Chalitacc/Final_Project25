import React, { useState } from "react";
import styles from "./Contact.module.css";
import useConctactValidation from "../../hooks/useContactValidation";
import Buttons from "../../Components/Buttons/Buttons";
import { database } from "../../../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Modal from "../../Components/Modal/Modal";

const Contact = () => {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    topic: "",
    message: "",
  });

  const { contactErrors, validateContactForm, validateMessageLength } =
    useConctactValidation();
  const [contactModal, setContactModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "message") {
      validateMessageLength(value, 300);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateContactForm(userData)) {
      console.log("form is not valid");
      return;
    }
    try {
      const docRef = await addDoc(collection(database, "contactMessages"), {
        ...userData,
        submittedAt: serverTimestamp(),
      });
      setContactModal(true);
      console.log("document added", docRef.id);
      setUserData({
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",
        topic: "",
        message: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form className={styles.contactForm} noValidate onSubmit={handleSubmit}>
        <div className={styles.contactFormContainer}>
          <h2 className={styles.formTitle}>Contact Us</h2>
          <section className={styles.userDetail}>
            <div className={styles.inputGroup}>
              <label htmlFor="firstname">First name</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Enter your firstname"
                className={styles.formInput}
                onChange={handleChange}
                value={userData.firstname}
              />
              <p className={styles.errorMessage}>{contactErrors.firstname}</p>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="lastname">Last name</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Enter your lastname"
                onChange={handleChange}
                value={userData.lastname}
                className={styles.formInput}
              />
              <p className={styles.errorMessage}>{contactErrors.lastname}</p>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number (8 digits)"
                className={styles.formInput}
                onChange={handleChange}
                value={userData.phoneNumber}
              />
              <p className={styles.errorMessage}>{contactErrors.phoneNumber}</p>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                className={styles.formInput}
                onChange={handleChange}
                value={userData.email}
              />
              <p className={styles.errorMessage}>{contactErrors.email}</p>
            </div>
          </section>

          <section className={styles.contactSection}>
            <div className={styles.inputGroup}>
              <label htmlFor="topic">Topic</label>
              <input
                type="text"
                id="topic"
                name="topic"
                placeholder="Enter the topic of your message (max 20 characters)"
                className={styles.formInput}
                onChange={handleChange}
                value={userData.topic}
              />
              <p className={styles.errorMessage}>{contactErrors.topic}</p>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="messsage">Message</label>
              <textarea
                name="message"
                id="message"
                placeholder="Enter your message (max 300 charachters"
                cols="30"
                rows="10"
                maxLength={300}
                className={styles.textArea}
                onChange={handleChange}
                value={userData.message}
              ></textarea>
              <div className={styles.messageErrorAndCount}>
                Typed Characters:{" "}
                <span>{userData.message ? userData.message.length : 0}</span>
                /300
                <p className={styles.errorMessage}>{contactErrors.message}</p>
              </div>
            </div>
          </section>
          <Buttons className={styles.submitButton}>Send Message</Buttons>
        </div>
      </form>
      {contactModal && (
        <Modal>
          <div className={styles.contactModalContainer}>
            <h2>Thank you! Your contact message has been delivered!</h2>
            <p>
              We will get back to you as soon as possible. Thank you for
              reaching out to us! We appreciate your patience and look forward
              to assist you further.{" "}
            </p>
            <Buttons
              className={styles.closeModalButton}
              onClick={() => setContactModal(false)}
            >
              Close
            </Buttons>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Contact;
