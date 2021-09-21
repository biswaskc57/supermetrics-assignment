import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from "./login";

test("form in <Login/>  calls onSubmit", () => {
  const mockHandler = jest.fn();

  const component = render(<Login handleLogin={mockHandler} />);

  const form = component.container.querySelector("form");

  fireEvent.submit(form);
  expect(mockHandler.mock.calls).toHaveLength(1);
});
