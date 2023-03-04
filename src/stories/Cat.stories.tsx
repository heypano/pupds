import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import CatStory from "./CatStory";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "DrawWithin sample story",
  component: CatStory,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof CatStory>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CatStory> = (args) => (
  <CatStory {...args} />
);

export const Cat = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Cat.args = {};
