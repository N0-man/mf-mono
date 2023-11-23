import React from "react";
import { render } from "@testing-library/react";
import Data from "./Data";

describe("Data Component", () => {
  it("renders correct number of divs", () => {
    const { container } = render(<Data />);
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBe(10000);
  });

});
