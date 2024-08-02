import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BookSearch } from "@components";
import type { Book } from "@utils";
import useFetchBooks from "src/hooks/useFetchBooks";

// Mock the useFetchBooks hook
vi.mock("src/hooks/useFetchBooks", () => ({
  default: vi.fn(() => ({
    results: [],
    isLoading: false,
  })),
}));

describe("BookSearch", () => {
  const mockSelectedBooks: Book[] = [];
  const mockSetSelectedBooks = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the input field", () => {
    render(
      <BookSearch
        selectedBooks={mockSelectedBooks}
        setSelectedBooks={mockSetSelectedBooks}
      />
    );
    expect(
      screen.getByPlaceholderText("Search for a book summary...")
    ).toBeInTheDocument();
  });

  it("updates input value on change", async () => {
    render(
      <BookSearch
        selectedBooks={mockSelectedBooks}
        setSelectedBooks={mockSetSelectedBooks}
      />
    );
    const input = screen.getByPlaceholderText("Search for a book summary...");
    await userEvent.type(input, "test");
    expect(input).toHaveValue("test");
  });

  it("shows loading state", async () => {
    (useFetchBooks as jest.Mock).mockReturnValue({
      results: [],
      isLoading: true,
    });

    render(
      <BookSearch
        selectedBooks={mockSelectedBooks}
        setSelectedBooks={mockSetSelectedBooks}
      />
    );
    await userEvent.type(
      screen.getByPlaceholderText("Search for a book summary..."),
      "test"
    );

    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  it("displays search results", async () => {
    const mockResults: Book[] = [
      {
        id: 1,
        title: "Book 1",
        summary: "",
        author: "",
      },
      { id: 2, title: "Book 2", summary: "", author: "" },
    ];
    (useFetchBooks as jest.Mock).mockReturnValue({
      results: mockResults,
      isLoading: false,
    });

    render(
      <BookSearch
        selectedBooks={mockSelectedBooks}
        setSelectedBooks={mockSetSelectedBooks}
      />
    );
    await userEvent.type(
      screen.getByPlaceholderText("Search for a book summary..."),
      "test"
    );

    await waitFor(() => {
      expect(screen.getByText("1) Book 1")).toBeInTheDocument();
      expect(screen.getByText("2) Book 2")).toBeInTheDocument();
    });
  });

  it("calls setSelectedBooks when a result is clicked", async () => {
    const mockResults: Book[] = [
      {
        id: 1,
        title: "Book 1",
        summary: "",
        author: "",
      },
    ];
    (useFetchBooks as jest.Mock).mockReturnValue({
      results: mockResults,
      isLoading: false,
    });

    render(
      <BookSearch
        selectedBooks={mockSelectedBooks}
        setSelectedBooks={mockSetSelectedBooks}
      />
    );
    await userEvent.type(
      screen.getByPlaceholderText("Search for a book summary..."),
      "test"
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("1) Book 1"));
    });

    expect(mockSetSelectedBooks).toHaveBeenCalledWith([
      { id: 1, title: "Book 1", summary: "", author: "" },
    ]);
  });

  it("clears input and query after selecting a book", async () => {
    const mockResults: Book[] = [
      { id: 1, title: "Book 1", summary: "", author: "" },
    ];
    (useFetchBooks as jest.Mock).mockReturnValue({
      results: mockResults,
      isLoading: false,
    });

    render(
      <BookSearch
        selectedBooks={mockSelectedBooks}
        setSelectedBooks={mockSetSelectedBooks}
      />
    );
    const input = screen.getByPlaceholderText("Search for a book summary...");
    await userEvent.type(input, "test");

    await waitFor(() => {
      fireEvent.click(screen.getByText("1) Book 1"));
    });

    expect(input).toHaveValue("");
    expect(useFetchBooks).toHaveBeenLastCalledWith("");
  });
});
