import { useState, useEffect } from "react";
import { fetchStreamResults } from "@utils";
import type { Book } from "@utils";

const useFetchBooks = (query: string) => {
  const [results, setResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const data = await fetchStreamResults(query);
        setResults(data && data.length > 0 ? data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  return { results, isLoading };
};

export default useFetchBooks;
