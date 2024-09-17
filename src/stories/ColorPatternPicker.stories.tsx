import { Meta, StoryObj } from "@storybook/react";
import { ColorPatternPicker } from "../components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ColorPatternPicker> = {
  title: "ColorPatternPicker story",
  component: ColorPatternPicker,
  tags: ["autodocs"],
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

export default meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type Story = StoryObj<typeof ColorPatternPicker>;

export const ColorPatternPickerStory: Story = {
  args: {},
};
