import { ChangeEvent, Dispatch, FC, useState } from "react";
import "./style.css";
import useFetchBooks from "../../hooks/useFetchBooks";

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
  const { results, isLoading } = useFetchBooks(query);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleResultClick = (book: Book) => {
    setSelectedBooks([...selectedBooks, book]);
    setQuery("");
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
