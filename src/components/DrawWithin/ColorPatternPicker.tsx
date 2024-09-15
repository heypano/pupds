import { patternMap, PatternType } from "./patterns/data";
import React from "react";
import styled from "styled-components";

interface ColorPatternPickerProps {
  patternIndex: number;
  color: string;
  pattern: PatternType;
  setColor: (color: string) => void;
  setPattern: (pattern: PatternType) => void;
  setPatternIndex: (patternIndex: number) => void;
  isSelected: boolean;
  patternIdBase: string;
}

const StContainer = styled.section<Partial<ColorPatternPickerProps>>`
  cursor: pointer;
  position: relative;
  height: 100px;
  svg {
    border: ${({ isSelected }) =>
      isSelected ? "2px solid hsl(150deg, 50%, 50%)" : "0px"};
  }
  &,
  * {
    box-sizing: border-box;
  }
`;

const StPreview = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  svg {
    height: 100%;
  }
`;

const StControlsContainer = styled.section`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StControls = styled.section`
  display: grid;
  align-items: center;
  height: 100px;
`;

export function ColorPatternPicker(props: ColorPatternPickerProps) {
  const {
    color,
    pattern,
    setColor,
    setPattern,
    setPatternIndex,
    patternIndex,
    isSelected,
    patternIdBase,
  } = props;
  return (
    <StContainer
      patternIndex={patternIndex}
      patternIdBase={patternIdBase}
      isSelected={isSelected}
      onClick={() => {
        setPatternIndex(patternIndex);
      }}
    >
      <StControlsContainer>
        <StControls>
          <select
            value={pattern}
            onChange={(event) => {
              setPattern(event.target.value);
            }}
          >
            {Object.keys(patternMap).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          <input
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
          />
        </StControls>
      </StControlsContainer>
      <StPreview>
        <svg>
          <rect
            fill={`url(#${patternIdBase}_${patternIndex})`}
            width="100%"
            height="100%"
          ></rect>
        </svg>
      </StPreview>
    </StContainer>
  );
}

export default ColorPatternPicker;
