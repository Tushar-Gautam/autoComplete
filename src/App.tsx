import { useState } from "react";
import "./app.css";
import { BookSearch, Card } from "@components";
import type { Book } from "@utils";

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
          <Card {...book} />
        ))}
      </div>
    </main>
  );
}

export default App;
