import styled from "styled-components";
import React, { useMemo, useState } from "react";
import { PatternData, patternMap, PatternType } from "./patterns/data";
import PatternPreview from "./PatternPreview";
import { Patterns, PatternWithFill } from "./patterns/Patterns";

const StPatternPickerContainer = styled.section`
  display: flex;
  overflow: auto;
  gap: 10px;
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
  border: 1px solid ${({ selected }) => (selected ? "green" : "transparent")};

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
};

export function PatternPicker({
  onSelect,
  selectedPattern,
}: PatternPickerProps) {
  const patternBase = "pattern_preview";
  const patternsWithFill = useMemo<PatternWithFill[]>(
    () =>
      Object.entries(patternMap).map(([key, patternData]) => {
        return { type: key, fill: "#000" };
      }),
    []
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
