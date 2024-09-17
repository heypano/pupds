import { Meta, StoryObj } from "@storybook/react";
import { PatternPicker } from "../components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PatternPicker> = {
  title: "PatternPicker story",
  component: PatternPicker,
  tags: ["autodocs"],
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

export default meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type Story = StoryObj<typeof PatternPicker>;

export const PatternPickerStory: Story = {
  args: {},
};
