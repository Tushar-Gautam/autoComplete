import { FC } from "react";
import "./style.css";

interface CardProps {
  id: number;
  summary: string;
  title: string;
  author: string;
}

const Card: FC<CardProps> = ({ title, summary, author, id }) => {
  return (
    <div className="card" key={id}>
      <h3>{title}</h3>
      <p>{summary}</p>
      <p>
        <strong>Author:</strong> {author}
      </p>
    </div>
  );
};
export default Card;
