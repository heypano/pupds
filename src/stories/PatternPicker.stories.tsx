import { Meta, StoryObj } from "@storybook/react";
import { PatternPicker, PatternType } from "../components";
import React, { useEffect, useState } from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PatternPicker> = {
  title: "PatternPicker story",
  component: PatternPicker,
  tags: ["autodocs"],
  argTypes: {
    selectedPattern: {
      control: {
        type: "select",
        options: ["pattern1", "pattern2", "pattern3"],
      }, // Example of possible patterns
    },
    onSelect: { action: "selected" }, // Storybook will log this action
  },
};
// Define a Template for your story
const Template = ({
  selectedPattern: propSelectedPattern,
  onSelect,
}: React.ComponentProps<typeof PatternPicker>) => {
  const [selectedPattern, setSelectedPattern] = useState<
    PatternType | undefined
  >(propSelectedPattern);

  useEffect(() => {
    setSelectedPattern(propSelectedPattern);
  }, [propSelectedPattern]);

  const handleSelect = (patternType: PatternType) => {
    setSelectedPattern(patternType);
    onSelect(patternType); // Call the provided onSelect prop for logging in Storybook
  };

  return (
    <PatternPicker selectedPattern={selectedPattern} onSelect={handleSelect} />
  );
};

export default meta;
export const Default = Template.bind({});

type Story = StoryObj<typeof PatternPicker>;
