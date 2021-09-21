import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import Login from "./components/login/login";
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Supermetrics Assignment/);
  expect(linkElement).toBeInTheDocument();
});
