import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import CatStory from "./CatStory";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CatStory> = {
  title: "DrawWithin sample story",
  component: CatStory,
  tags: ["autodocs"],
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

export default meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type Story = StoryObj<typeof CatStory>;

export const Cat: Story = {
  args: {
    className: "hu",
  },
};
