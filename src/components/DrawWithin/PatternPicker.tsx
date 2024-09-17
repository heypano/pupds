import styled from "styled-components";
import React, { useMemo, useState } from "react";
import { PatternData, patternMap, PatternType } from "./patterns/data";
import PatternPreview from "./PatternPreview";
import { Patterns, PatternWithFill } from "./patterns/Patterns";

const StPatternPickerContainer = styled.section`
  display: grid;
  grid-auto-flow: column; /* places items in a row */
  grid-gap: 10px; /* space between items */
  overflow-x: auto; /* allow horizontal scrolling */
  overflow-y: hidden; /* hide vertical scrollbar */
  white-space: nowrap; /* prevent wrapping to the next line */
  align-items: flex-start;
  justify-content: flex-start;
  @media (max-width: 768px) {
    grid-template-rows: repeat(2, 1fr); /* two rows */
  }
`;

const desktopPatternSize = 150;
const mobilePatternSize = 100;
const StPatternPreviewContainer = styled.section<{ selected: boolean }>`
  display: flex;
  flex-shrink: 0;
  width: ${desktopPatternSize}px;
  height: ${desktopPatternSize}px;
  @media (max-width: 768px) {
    width: ${mobilePatternSize}px;
    height: ${mobilePatternSize}px;
  }
  border: 2px solid ${({ selected }) => (selected ? "green" : "transparent")};
  padding: 5px;

  &:hover {
    filter: invert(0.5);
  }

  & svg {
    width: 100%;
    height: 100%;
  }
`;
type PatternPickerProps = {
  selectedPattern?: PatternType;
  onSelect: (patternType: PatternType) => void;
  fill?: string;
};

export function PatternPicker({
  onSelect,
  selectedPattern,
  fill = "#000",
}: PatternPickerProps) {
  const patternBase = "pattern_preview";
  const patternsWithFill = useMemo<PatternWithFill[]>(
    () =>
      Object.entries(patternMap).map(([key, patternData]) => {
        return { type: key, fill };
      }),
    [fill]
  );
  return (
    <>
      <svg style={{ width: 0, height: 0 }}>
        <Patterns patterns={patternsWithFill} patternIdBase={patternBase} />
      </svg>
      <StPatternPickerContainer>
        {Object.keys(patternMap).map((key, index) => {
          return (
            <StPatternPreviewContainer
              key={index}
              selected={selectedPattern === key}
              onClick={() => {
                onSelect(key as PatternType);
              }}
            >
              <PatternPreview
                patternIdBase={patternBase}
                patternIndex={index}
              />
            </StPatternPreviewContainer>
          );
        })}
      </StPatternPickerContainer>
    </>
  );
}

export default PatternPicker;
