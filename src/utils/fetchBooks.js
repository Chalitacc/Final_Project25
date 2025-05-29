const fetchBooks = async (query, signal) => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const encodedQuery = encodeURIComponent(query);
  const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodedQuery}&key=${apiKey}&maxResults=10`;
  //   `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}&key=${apiKey}&maxResults=10`;

  try {
    const response = await fetch(url, { signal });
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const data = await response.json();

    const filteredBooks = (data.items || []).filter((book) => {
      const title = book.volumeInfo.title?.toLowerCase() || "";
      const description = book.volumeInfo.description?.toLowerCase() || "";
      const isBundle = /(box set|bundle|collection|vol\.\s*\d+-\d+)/.test(
        title + description
      );
      return !isBundle;
    });
    return filteredBooks;
  } catch (error) {
    if (error.name === "Abort Error") {
      return [];
    }
    console.log("error fetching book", error);
    return [];
  }
};

export default fetchBooks;
