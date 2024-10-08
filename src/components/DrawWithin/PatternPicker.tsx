import styled from "styled-components";
import React, { useMemo } from "react";
import { patternMap, PatternType } from "./assets/patterns/data";
import PatternPreview from "./PatternPreview";
import { PatternsDefs, PatternWithFill } from "./assets/patterns/PatternsDefs";
import { v4 as uuid } from "uuid";
import { PropsWithClassName } from "../../lib";

const desktopPatternHeight = 150;
const mobilePatternHeight = 100;
const StPatternPickerContainer = styled.section`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${desktopPatternHeight}px, 1fr)
  );
  grid-gap: 10px;
  overflow: auto;
  user-select: none;
  white-space: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

const StPatternPreviewContainer = styled.section<{ selected: boolean }>`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: ${desktopPatternHeight}px;
  @media (max-width: 768px) {
    height: ${mobilePatternHeight}px;
  }
  border: 2px solid ${({ selected }) => (selected ? "green" : "transparent")};
  padding: 5px;

  &:hover {
    filter: grayscale(0.4);
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
  className,
}: PropsWithClassName<PatternPickerProps>) {
  const patternBase = useMemo(() => `pattern_preview_${uuid()}`, []);
  const patternsWithFill = useMemo<PatternWithFill[]>(
    () =>
      Object.entries(patternMap).map(([key, patternData]) => {
        return { type: key, fill };
      }),
    [fill]
  );
  return (
    <StPatternPickerContainer className={className}>
      <svg style={{ width: 0, height: 0 }}>
        <PatternsDefs patterns={patternsWithFill} patternIdBase={patternBase} />
      </svg>
      {Object.keys(patternMap).map((key, index) => {
        return (
          <StPatternPreviewContainer
            key={index}
            selected={selectedPattern === key}
            onClick={() => {
              onSelect(key as PatternType);
            }}
          >
            <PatternPreview patternIdBase={patternBase} patternIndex={index} />
          </StPatternPreviewContainer>
        );
      })}
    </StPatternPickerContainer>
  );
}

export default PatternPicker;
