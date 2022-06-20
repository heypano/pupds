import React, { Ref, useMemo } from "react";
import { useCursor } from "./UseCursor";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { getPathFromPoints } from "../../util/svg";

const strokeWidth = 60;

export interface ScratchProps {
  text?: string;
  drawText?: boolean;
  showClearButton?: boolean;
}

const SvgContainer = styled.section`
  height: 100%;
  margin: 0;
`;

const StSvg = styled.svg`
  width: 100%;
  height: 100%;
  user-select: none;
`;

const StButton = styled.span`
  color: hsla(150 80% 40% / 1);
  cursor: pointer;
  &:hover {
    color: hsla(150 80% 40% / 0.7);
  }
`;

function Scratch(props: ScratchProps) {
  const { text = "", drawText, showClearButton } = props;
  const maskId = useMemo(() => uuidv4(), []);
  const pathId = useMemo(() => uuidv4(), []);
  const { points, ref, clearPoints } = useCursor();
  const path = useMemo(() => getPathFromPoints(points), [points]);

  console.log(
    text
      .split("")
      .reduce<Array<Array<string>>>(
        (acc: Array<Array<string>>, char: string, index) => {
          if (index % 20 === 0) {
            return [...acc, [char]];
          }
          acc[acc.length - 1].push(char);
          return acc;
        },
        []
      )
  );

  return (
    <SvgContainer>
      {showClearButton && (
        <StButton
          role="button"
          onClick={() => {
            clearPoints();
          }}
        >
          Clear
        </StButton>
      )}
      <StSvg viewBox={`0 0 1600 1600`} ref={ref as Ref<SVGSVGElement>}>
        <clipPath id={maskId}>
          <text
            fontSize={window.innerHeight / 9}
            x={window.innerWidth / 9}
            y={window.innerHeight / 6}
          >
            {drawText && <textPath xlinkHref={`#${pathId}`}>{text}</textPath>}
            {!drawText &&
              text
                .split("")
                .reduce<Array<Array<string>>>(
                  (acc: Array<Array<string>>, char: string, index) => {
                    if (index % 60 === 0) {
                      return [...acc, [char]];
                    }
                    acc[acc.length - 1].push(char);
                    return acc;
                  },
                  []
                )
                .map((arr, ind) => (
                  <tspan key={ind} x="0" dy={window.innerHeight / 6}>
                    {arr.join("")}
                  </tspan>
                ))}
          </text>
        </clipPath>

        <g clipPath={`url(#${maskId})`}>
          <path
            d={path}
            id={pathId}
            strokeWidth={strokeWidth}
            fill="transparent"
            stroke="grey"
          />
        </g>
      </StSvg>
    </SvgContainer>
  );
}

Scratch.defaultProps = {
  text: "Έφτιαξα αυτό το πράγμα που σε αφήνει να κρύψεις κείμενο και να το ξύσεις αλλά επίσης σε αφήνει να το ζωγραφίσεις σε διάφορα σχήματα. ♡",
  drawText: false,
  showClearButton: false,
};

export default Scratch;
