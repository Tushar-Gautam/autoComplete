import { delay, http, HttpResponse } from "msw";
import { authors, summaries, title } from "./data/data";

const END_POINT = "http://localhost:5173/summaries";

interface Book {
  id: number;
  summary: string;
  title: string;
  author: string;
}

export const handlers = [
  http.get(`${END_POINT}`, async ({ request }) => {
    const url = new URL(request.url);
    const word = url.searchParams.get("word");
    if (!word) {
      return HttpResponse.json({
        sortedResults: [],
      });
    }
    const combinedResults = summaries.map((summary) => {
      const author = authors.find((author) => author.book_id === summary.id);
      return {
        ...summary,
        author: author ? author.author : "Unknown",
        title: title[Math.floor(Math.random() * title.length)],
      };
    });

    const filteredResults = combinedResults.filter((book) =>
      book.summary.toLowerCase().includes(word.toLowerCase())
    );
    const sortedResults: Book[] = filteredResults.sort((a, b) => {
      const countA = (a.summary.match(new RegExp(word, "gi")) || []).length;
      const countB = (b.summary.match(new RegExp(word, "gi")) || []).length;
      return countB - countA;
    });
    await delay(300);
    return HttpResponse.json({
      sortedResults,
    });
  }),
];
