import React, { PropsWithChildren } from "react";
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

const StForeignObjectContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

type PatternPreviewProps = {
  patternIdBase: string;
  patternIndex: number;
  onClick?: (patternType: PatternType) => void;
  defs?: React.ReactNode;
};

export const PatternPreview: React.FC<
  PropsWithChildren<PatternPreviewProps>
> = ({ patternIdBase, patternIndex, onClick, defs, children }) => {
  return (
    <StPreview onClick={() => onClick?.(patternIndex)}>
      <svg xmlns="http://www.w3.org/2000/svg">
        {defs}
        <rect
          fill={`url(#${patternIdBase}_${patternIndex})`}
          width="100%"
          height="100%"
        />
        {children && (
          <foreignObject x="0" y="0" width="100%" height="100%">
            <StForeignObjectContent>{children}</StForeignObjectContent>
          </foreignObject>
        )}
      </svg>
    </StPreview>
  );
};
export default PatternPreview;
