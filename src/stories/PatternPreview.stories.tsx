import { Meta, StoryObj } from "@storybook/react";
import { patternMap, PatternPreview, PatternType } from "../components";
import React, { useEffect, useMemo, useState } from "react";
import PatternsDefs, {
  PatternWithFill,
} from "../components/DrawWithin/patterns/PatternsDefs";
import { v4 as uuid } from "uuid";
import styled from "styled-components";

const StCaption = styled.div<{ borderColor?: string }>`
  background-color: white;
  padding: 0.5rem;
  border-radius: 5px;
  border: 3px solid ${({ borderColor }) => borderColor};
`;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PatternPreview> = {
  title: "PatternPreview story",
  component: PatternPreview,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "click" }, // Storybook will log this action
    patternIndex: {
      control: "number",
    },
    children: {
      control: {
        type: "text",
      },
    },
  },
  args: {
    children: "Τεστ",
    patternIndex: 0,
  },
};
// Define a Template for your story
const Template = ({
  patternIndex: propPatternIndex,
  children: propChildren,
}: React.ComponentProps<typeof PatternPreview>) => {
  const patternBase = useMemo(() => `pattern_preview_${uuid()}`, []);
  const patternsWithFill = useMemo<PatternWithFill[]>(() => {
    return Object.entries(patternMap).map(([key, patternData]) => {
      const fill = `hsl(${Math.random() * 360}, 50%, 50%)`;
      return { type: key, fill };
    });
  }, []);
  const [patternIndex, setPatternIndex] = useState(0);
  const [children, setChildren] = useState<React.ReactNode>();

  useEffect(() => {
    setPatternIndex(propPatternIndex);
  }, [propPatternIndex]);

  useEffect(() => {
    setChildren(propChildren);
  }, [propChildren]);

  return (
    <>
      <input
        type="number"
        min={0}
        max={patternsWithFill.length - 1}
        value={patternIndex}
        onChange={(e) => setPatternIndex(parseInt(e.target.value))}
      />
      <PatternPreview
        patternIdBase={patternBase}
        patternIndex={patternIndex}
        onClick={() => {
          console.log("click");
        }}
        defs={
          <PatternsDefs
            patterns={patternsWithFill}
            patternIdBase={patternBase}
          />
        }
      >
        <StCaption>{children}</StCaption>
      </PatternPreview>
    </>
  );
};

export default meta;
export const Default = Template.bind({});

type Story = StoryObj<typeof PatternPreview>;
