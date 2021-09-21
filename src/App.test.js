import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

test("renders elements in App component", () => {
  render(<App />);
  const linkElement = screen.getByText(/Supermetrics Assignment/);
  expect(linkElement).toBeInTheDocument();
});
