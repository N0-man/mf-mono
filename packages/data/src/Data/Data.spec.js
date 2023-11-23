import React from "react";
import { render } from "@testing-library/react";
import Data from "./Data";

describe("Data Component", () => {
  it("renders correct number of divs", () => {
    const { container } = render(<Data />);
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBe(10000);
  });

  it("renders divs with moment dates", () => {
    const { container } = render(<Data />);
    const momentDivs = Array.from(container.querySelectorAll("div")).map(
      (div) => div.textContent
    );

    momentDivs.forEach((momentInstance, index) => {
      expect(momentDivs[index]).toEqual(momentInstance.toString());
    });
  });
});
