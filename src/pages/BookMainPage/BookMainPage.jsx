import React, { useEffect, useState } from "react";
import { getAuthContext } from "../../context/authContext";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { database } from "../../../firebaseConfig";
import styles from "./BookMainPage.module.css";
import Buttons from "../../Components/Buttons/Buttons";
import { data, useNavigate } from "react-router-dom";

const BookMainPage = () => {
  const { user } = getAuthContext();
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      if (!user) return;

      try {
        const readingSnapshot = await getDocs(
          collection(database, "users", user.uid, "currentlyReading")
        );
        const readingList = readingSnapshot.docs.map((doc) => doc.data());
        setCurrentlyReading(readingList);

        const readSnapshot = await getDocs(
          collection(database, "users", user.uid, "readBooks")
        );
        const readList = readSnapshot.docs.map((doc) => doc.data());
        setReadBooks(readList);
      } catch (error) {
        console.log("Error fetching books");
      }
    };
    fetchBooks();
  }, [user]);

  const handleReadBooks = async (book) => {
    try {
      await setDoc(doc(database, "users", user.uid, "readBooks", book.id), {
        ...book,
        markedAsRead: new Date(),
      });
      await deleteDoc(
        doc(database, "users", user.uid, "currentlyReading", book.id)
      );
      setCurrentlyReading((prev) => prev.filter((b) => b.id !== book.id));
      setReadBooks((prev) => [...prev, { ...book, markedAsRead: new Date() }]);
    } catch (error) {
      console.log("Error marking book as read", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.currentlyReadingSection}>
        <h2>Currently reading 📖</h2>
        <div className={styles.bookList}>
          {currentlyReading.map((book) => (
            <div
              key={book.id}
              className={styles.bookCard}
              onClick={() => navigate(`/book/${book.id}`)}
            >
              <img src={book.image} alt={book.title} />
              <p>{book.title}</p>
              <Buttons
                className={styles.readButton}
                onClick={() => handleReadBooks(book)}
              >
                Mark as Read
              </Buttons>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.booksReadSection}>
        <h2>Books Read 📚</h2>
        <div className={styles.bookGrid}>
          <div className={styles.bookReadContainer}>
            {readBooks.map((book) => (
              <div
                key={book.id}
                className={styles.bookCard}
                onClick={() => navigate(`/book/${book.id}`)}
              >
                <img src={book.image} alt={book.title} />
                <p>{book.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookMainPage;
