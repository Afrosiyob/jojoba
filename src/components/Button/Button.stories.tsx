/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/consistent-type-assertions */

import React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import Button from "./Button";

export default {
  title: "Component/Button",
  component: Button,
  argTypes: {
    children: {
      control: "text",
    },
  },
  parameters: {
    actions: { argTypesRegex: "^on.*" },
  },
} as ComponentMeta<typeof Button>;

export const ToStorybook: ComponentStory<typeof Button> = (props) => (
  <Button {...props} />
);

ToStorybook.story = {
  name: "Button",
  args: {
    children: "Button",
  },
};
