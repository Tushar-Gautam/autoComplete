import {
  ChangeEvent,
  Dispatch,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import { debounce } from "lodash";
import "./style.css";
import type { Book } from "@utils";
import useFetchBooks from "src/hooks/useFetchBooks";

interface BookSearchProps {
  selectedBooks: Book[];
  setSelectedBooks: Dispatch<React.SetStateAction<Book[]>>;
}

const BookSearch: FC<BookSearchProps> = ({
  selectedBooks,
  setSelectedBooks,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const { results, isLoading } = useFetchBooks(query);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetQuery = useCallback(
    debounce((value: string) => setQuery(value), 500),
    []
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debouncedSetQuery(e.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedSetQuery.cancel();
    };
  }, [debouncedSetQuery]);

  const handleResultClick = (book: Book) => {
    setSelectedBooks([...selectedBooks, book]);
    setInputValue("");
    setQuery("");
  };

  return (
    <div className="book-search-container">
      <div className="book-search">
        <input
          type="text"
          value={inputValue}
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
