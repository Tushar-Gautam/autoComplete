import { render, screen } from "@testing-library/react";
import { Card } from "@components";

describe("Card Component", () => {
  const mockProps = {
    id: 1,
    title: "Sample Book",
    summary: "This is a sample summary.",
    author: "John Doe",
  };

  it("renders the Card component", () => {
    render(<Card {...mockProps} />);
    const cardElement = screen.getByText("Sample Book");
    expect(cardElement).toBeInTheDocument();
  });

  it("displays the correct title, summary, and author", () => {
    render(<Card {...mockProps} />);
    expect(screen.getByText("Sample Book")).toBeInTheDocument();
    expect(screen.getByText("This is a sample summary.")).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<Card {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
