import { FC } from "react";
import "./style.css";

interface CardProps {
  book: {
    id: number;
    summary: string;
    title: string;
    author: string;
  };
}

const Card: FC<CardProps> = ({ book }) => {
  return (
    <div className="card" key={book.id}>
      <h3>{book.title}</h3>
      <p>{book.summary}</p>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
    </div>
  );
};
export default Card;
