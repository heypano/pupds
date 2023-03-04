import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Scratch } from "../components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Scratch sample story",
  component: Scratch,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof Scratch>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Scratch> = (args) => (
  <Scratch {...args} />
);

export const RegularText = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
RegularText.args = {
  showClearButton: true,
};

export const DrawText = Template.bind({});
DrawText.args = {
  drawText: true,
  showClearButton: true,
};
