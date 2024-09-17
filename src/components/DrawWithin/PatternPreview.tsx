import React from "react";
import styled from "styled-components";
import { PatternType } from "./patterns/data";

const StPreview = styled.section`
  cursor: pointer;

  position: relative;
  width: 100%;
  height: 100%;
  &:hover {
    filter: brightness(1.1);
  }
  svg {
    height: 100%;
  }
`;

type PatternPreviewProps = {
  patternIdBase: string;
  patternIndex: number;
  onClick?: (patternType: PatternType) => void;
};

export const PatternPreview: React.FC<PatternPreviewProps> = ({
  patternIdBase,
  patternIndex,
  onClick,
}) => {
  return (
    <StPreview onClick={() => onClick?.(patternIndex)}>
      <svg>
        <rect
          fill={`url(#${patternIdBase}_${patternIndex})`}
          width="100%"
          height="100%"
        ></rect>
      </svg>
    </StPreview>
  );
};
export default PatternPreview;
