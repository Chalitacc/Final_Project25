import React, { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";
import fetchBooks from "../../utils/fetchBooks";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const delayDebounce = setTimeout(() => {
      if (query.length < 3) {
        setResults([]);
        return;
      }
      const search = async () => {
        setLoading(true);
        const books = await fetchBooks(query, controller.signal);
        setResults(books);
        setLoading(false);
      };
      search();
    }, 500);
    return () => {
      clearTimeout(delayDebounce);
      controller.abort();
    };
  }, [query]);

  const handleSelectedBooks = (bookId) => {
    setQuery("");
    setResults([]);
    navigate(`/book/${bookId}`);
  };

  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        placeholder="Search books..."
        className={styles.searchInput}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <p className={styles.loadingMessage}>Loading....</p>}
      {results.length > 0 && (
        <ul>
          <div className={styles.searchBarResults}>
            {results.map((book) => (
              <li
                key={book.id}
                className={styles.dropDownItem}
                onClick={() => handleSelectedBooks(book.id)}
              >
                <img
                  src={
                    book.volumeInfo.imageLinks?.thumbnail || "/placeholder.jpg"
                  }
                  alt={book.volumeInfo.title}
                  className={styles.bookImage}
                />
                <div className={styles.bookInfo}>
                  <strong>{book.volumeInfo.title}</strong>
                  <p>{book.volumeInfo.authors?.join(",")}</p>
                </div>
              </li>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
