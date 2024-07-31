import { ChangeEvent, Dispatch, FC, useState } from "react";
import { fetchStreamResults } from "../../utils/fetchSearchResults";
import "./style.css";

interface Book {
  id: number;
  summary: string;
  title: string;
  author: string;
}

interface BookSearchProps {
  selectedBooks: Book[];
  setSelectedBooks: Dispatch<React.SetStateAction<Book[]>>;
}

const BookSearch: FC<BookSearchProps> = ({
  selectedBooks,
  setSelectedBooks,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      setIsLoading(true);
      try {
        const data = await fetchStreamResults(value);
        setResults(data && data.length > 0 ? data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  const handleResultClick = (book: Book) => {
    setSelectedBooks([...selectedBooks, book]);
    setQuery("");
    setResults([]);
  };

  return (
    <div className="book-search-container">
      <div className="book-search">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a book summary..."
        />
        {isLoading && <div className="loading">Loading...</div>}
        {results.length > 0 && (
          <ul className="results-list">
            {results.map((book) => (
              <li key={book.id} onClick={() => handleResultClick(book)}>
                {book.id}&#41; {book.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookSearch;
