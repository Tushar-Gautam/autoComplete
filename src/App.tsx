import { useState } from "react";
import "./app.css";
import { BookSearch, Card } from "./components";

interface Book {
  id: number;
  summary: string;
  title: string;
  author: string;
}

function App() {
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);

  return (
    <main className="app-wrapper">
      <BookSearch
        selectedBooks={selectedBooks}
        setSelectedBooks={setSelectedBooks}
      />
      <div className="card-container">
        {selectedBooks?.map((book) => (
          <Card book={book} />
        ))}
      </div>
    </main>
  );
}

export default App;
