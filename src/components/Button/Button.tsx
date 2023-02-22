/* eslint-disable react/jsx-props-no-spreading */

import React from "react";

import classes from "./Button.module.scss";

interface IProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<IProps> = ({ onClick, children }) => (
  <div
    data-testid="BUTTON_TEST_ID"
    className={classes.wrapper}
    {...{ onClick }}
  >
    {children}
  </div>
);

export default Button;
