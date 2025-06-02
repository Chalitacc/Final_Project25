import React, { useEffect, useState } from "react";
import styles from "./BookDetails.module.css";
import { useParams } from "react-router-dom";
import { getAuthContext } from "../../context/authContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../../../firebaseConfig";
import Buttons from "../../Components/Buttons/Buttons";
import DOMPurify from "dompurify";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [bookAdded, setBookAdded] = useState(false);

  const [isCurrentlyReading, setIsCurrentlyReading] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const { user } = getAuthContext();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${bookId}`
        );
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.log("error fetching book details", error);
      }
    };
    fetchBooks();
  }, [bookId]);

  const handleAddToReading = async () => {
    if (!user || !book) return;
    try {
      const readingRef = doc(
        database,
        "users",
        user.uid,
        "currentlyReading",
        bookId
      );
      await setDoc(readingRef, {
        id: bookId,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors || [],
        image: book.volumeInfo.imageLinks?.thumbnail || "",
        addedAt: new Date(),
      });
      setBookAdded(true);
    } catch (error) {
      console.log("error adding to reading list", error);
    }
  };

  useEffect(() => {
    const checkBookStatus = async () => {
      if (!user) return;
      const readingRef = doc(
        database,
        "users",
        user.uid,
        "currentlyReading",
        bookId
      );
      const readRef = doc(database, "users", user.uid, "readBooks", bookId);

      const readingDoc = await getDoc(readingRef);
      const readDoc = await getDoc(readRef);

      setIsCurrentlyReading(readingDoc.exists());
      setIsRead(readDoc.exists());
    };
    checkBookStatus();
  }, [user, bookId]);

  if (!book) {
    return <p className={styles.loading}>Loading book details...</p>;
  }
  return (
    <div className={styles.bookDetailsWrapper}>
      <div className={styles.bookDetailsContainer}>
        <h2 className={styles.bookTitle}>{book.volumeInfo.title}</h2>
        <img
          src={book.volumeInfo.imageLinks?.thumbnail || "/placeholder.jpg"}
          alt={book.volumeInfo.title}
          className={styles.bookImage}
        />
        <p>
          <strong>Author: </strong>
          {book.volumeInfo.authors?.join(",")}
        </p>
        {user && (
          <>
            {isRead ? (
              <Buttons className={styles.addButton} disabled>
                Already read
              </Buttons>
            ) : isCurrentlyReading ? (
              <Buttons className={styles.addButton} disabled>
                Currently Reading
              </Buttons>
            ) : (
              <Buttons
                className={styles.addButton}
                onClick={handleAddToReading}
                disabled={bookAdded}
              >
                {bookAdded ? "Added!" : "Add to currently reading"}
              </Buttons>
            )}
          </>
        )}
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(book.volumeInfo.description),
          }}
        ></p>
      </div>
    </div>
  );
};

export default BookDetails;
