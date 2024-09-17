import { Meta, StoryObj } from "@storybook/react";
import { ColorPatternPicker, PatternType } from "../components";
import React, { ChangeEvent, useEffect, useState } from "react";
import ColorPicker from "../components/DrawWithin/ColorPicker";
import { Color, ColorResult } from "react-color";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ColorPatternPicker> = {
  title: "ColorPatternPicker story",
  component: ColorPatternPicker,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: {
        type: "text",
      },
    },
    patternType: {
      control: {
        type: "select",
        options: ["pattern1", "pattern2", "pattern3"],
      }, // Example of possible patterns
    },
    onChange: { action: "change" }, // Storybook will log this action
  },
  args: {
    color: "#65432111",
    patternType: "dominoes",
  },
};

const Template = ({
  color: propSelectedColor,
  patternType: propSelectedPatternType,
  onChange,
}: React.ComponentProps<typeof ColorPatternPicker>) => {
  const [selectedColor, setSelectedColor] = useState<string>(propSelectedColor);
  const [selectedPatternType, setSelectedPatternType] = useState<PatternType>(
    propSelectedPatternType
  );

  useEffect(() => {
    setSelectedColor(propSelectedColor);
  }, [propSelectedColor]);
  useEffect(() => {
    setSelectedPatternType(propSelectedPatternType);
  }, [propSelectedPatternType]);

  return (
    <>
      <div>
        <div>Color: {selectedColor}</div>
        <div>Pattern: {selectedPatternType}</div>
      </div>
      <ColorPatternPicker
        color={selectedColor}
        patternType={selectedPatternType}
        onChange={(patternWithFill) => {
          setSelectedPatternType(patternWithFill.type);
          setSelectedColor(patternWithFill.fill);
          onChange(patternWithFill);
        }}
      />
    </>
  );
};

export default meta;
export const Default = Template.bind({});
