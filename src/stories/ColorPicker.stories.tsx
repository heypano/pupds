import { Meta, StoryObj } from "@storybook/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import ColorPicker from "../components/DrawWithin/ColorPicker";
import { Color, ColorResult } from "react-color";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ColorPicker> = {
  title: "ColorPicker story",
  component: ColorPicker,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: {
        type: "text",
      },
    },
  },
};
// Define a Template for your story
const Template = ({
  color: propSelectedColor,
  onChange,
}: React.ComponentProps<typeof ColorPicker>) => {
  const [selectedColor, setSelectedColor] = useState<Color>();

  useEffect(() => {
    setSelectedColor(propSelectedColor);
  }, [propSelectedColor]);

  const handleSelect = (
    colorResult: ColorResult,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedColor(colorResult.hsl);
    onChange?.(colorResult, e); // Trigger Storybook action logging
  };

  return <ColorPicker color={selectedColor} onChange={handleSelect} />;
};

export default meta;
export const Default = Template.bind({});

type Story = StoryObj<typeof ColorPicker>;
