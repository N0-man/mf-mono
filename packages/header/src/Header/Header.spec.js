import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Header from "./Header";

describe("Header Component", () => {
  it("renders header with the correct title", () => {
    render(<Header />);
    const titleElement = screen.getByRole("heading", { level: 1 });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe("n0man's Cafe");
  });

  it("renders navigation links with correct href values", () => {
    render(<Header />);
    const navLinks = screen.getAllByRole("link");

    const expectedLinks = [
      { text: "Welcome", href: "/" },
      { text: "Eat", href: "/eat" },
      { text: "Drink", href: "/drink" },
      { text: "Enjoy", href: "/enjoy" },
      { text: "Go Home", href: "/gohome" },
    ];

    navLinks.forEach((link, index) => {
      expect(link.textContent).toBe(expectedLinks[index].text);
      expect(link.getAttribute("href")).toBe(expectedLinks[index].href);
    });
  });
});
