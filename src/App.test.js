import React from "react";
import App from "./App";
import { render, screen } from "@testing-library/react";

test('affiche le lien "apprendre react"', () => {
  render(<App />);
  const lienElement = screen.getByText(/apprendre react/i);
  expect(lienElement).toBeInTheDocument();
});
