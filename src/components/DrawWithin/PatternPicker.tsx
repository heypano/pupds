import styled from "styled-components";
import React, { useMemo, useState } from "react";
import { patternMap } from "./patterns/data";
import PatternPreview from "./PatternPreview";
import { Patterns, PatternWithFill } from "./patterns/Patterns";

const StPatternPickerContainer = styled.section`
  display: flex;
  overflow: auto;
  gap: 10px;
`;

const desktopPatternSize = 150;
const mobilePatternSize = 100;
const StPatternPreviewContainer = styled.section`
  display: flex;
  flex-shrink: 0;
  width: ${desktopPatternSize}px;
  height: ${desktopPatternSize}px;
  @media (max-width: 768px) {
    width: ${mobilePatternSize}px;
    height: ${mobilePatternSize}px;
  }
  &:hover {
    filter: invert(0.5);
  }
  & svg {
    width: 100%;
    height: 100%;
  }
`;

export function PatternPicker() {
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
        {Object.keys(patternMap).map((_, index) => {
          return (
            <StPatternPreviewContainer>
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
