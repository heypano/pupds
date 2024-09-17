import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Scratch } from "../components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Scratch> = {
  title: "Scratch story",
  component: Scratch,
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

export default meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type Story = StoryObj<typeof Scratch>;

export const RegularText: Story = {
  args: {
    showClearButton: true,
  },
};

export const DrawText: Story = {
  args: {
    drawText: true,
    showClearButton: true,
  },
};
