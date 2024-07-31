const END_POINT = "http://localhost:5173/summaries";

interface Book {
  id: number;
  summary: string;
  title: string;
  author: string;
}

export const fetchStreamResults = async (query: string) => {
  try {
    const response = await fetch(`${END_POINT}?word=${query}`);
    if (!response.ok) {
      throw new Error("Network error plz try again");
    }
    const { sortedResults }: { sortedResults: Book[] } = await response.json();
    return sortedResults;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};
