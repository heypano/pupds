import React, { forwardRef, ReactNode, useMemo } from "react";
import { v4 as uuid } from "uuid";
import { Path, useCursor } from "../Scratch/UseCursor";
import { getPathFromPoints } from "../../util/svg";
import styled from "styled-components";
import Patterns, { Pattern } from "./patterns/Patterns";

const StSvg = styled.svg`
  height: 100%;
`;

const StContainer = styled.section`
  display: grid;
  height: 100%;

  &,
  * {
    box-sizing: border-box;
  }
`;

export interface DrawWithinProps {
  strokeWidth?: number;
  strokeColor?: string;
  viewBox: string;
  ImagePaths: ReactNode;
  MaskPaths: ReactNode;
  className?: string;
  patternIndex?: number | null;
  patterns: Array<Pattern>;
  patternIdBase: string;
}

const DrawWithin = forwardRef<HTMLElement | null, DrawWithinProps>(
  (props, forwardedRef) => {
    const {
      strokeWidth = 6,
      strokeColor = "hotpink",
      viewBox,
      MaskPaths,
      ImagePaths,
      className,
      patternIndex,
      patterns,
      patternIdBase,
    } = props;
    const clipPathId = useMemo(() => uuid(), []);
    const pathId = useMemo(() => uuid(), []);
    const { paths, ref } = useCursor({
      generateMultiplePaths: true,
      pathOptions: { strokeColor, patternIndex },
    });
    // TODO add custom cursor that reflects selected pattern and brush size
    const allPaths = useMemo(
      () =>
        paths.map(
          (path) => {
            const { points, pathOptions = {} } = path as Path;
            return { path: getPathFromPoints(points), pathOptions };
          },
          [paths]
        ),
      [paths]
    );

    return (
      <StContainer
        className={className}
        ref={(r) => {
          if (forwardedRef) {
            if (typeof forwardedRef === "function") {
              forwardedRef(r);
            } else {
              forwardedRef.current = r;
            }
          }
        }}
      >
        <StSvg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={viewBox}
          ref={ref}
          height="100%"
        >
          <Patterns patterns={patterns} patternIdBase={patternIdBase} />
          <g clipPath={`url(#${clipPathId})`} fill="none">
            {allPaths.map(({ path, pathOptions }, index) => {
              const { patternIndex, strokeColor } = pathOptions;
              return (
                <path
                  key={index}
                  d={path}
                  id={`${pathId}_${index}`}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="transparent"
                  stroke={
                    Number.isInteger(patternIndex)
                      ? `url(#${patternIdBase}_${patternIndex})`
                      : strokeColor
                  }
                />
              );
            })}
          </g>
          {ImagePaths}
          <clipPath id={clipPathId}>{MaskPaths}</clipPath>
        </StSvg>
      </StContainer>
    );
  }
);
export default DrawWithin;
