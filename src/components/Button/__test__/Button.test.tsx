/* eslint-disable no-console */
import "@testing-library/jest-dom";

import React from "react";
import { logRoles, render, screen } from "@testing-library/react";

import Button from "../Button";

describe("Button component", () => {
  test("should render", () => {
    const handleClick = (): void => {
      console.log("Button clicked");
    };

    const view = render(<Button onClick={handleClick}>Button</Button>);

    const component = screen.getByTestId("BUTTON_TEST_ID");

    logRoles(view.container);
    expect(component).toBeInTheDocument();
  });
});
