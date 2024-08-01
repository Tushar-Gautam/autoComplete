import { SEARCH_END_POINT, type Book } from "@utils";

export const fetchStreamResults = async (query: string) => {
  try {
    const response = await fetch(`${SEARCH_END_POINT}?word=${query}`);
    if (!response.ok) {
      throw new Error("Network error plz try again");
    }
    const { sortedResults }: { sortedResults: Book[] } = await response.json();
    return sortedResults;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};
