import React, { forwardRef, ReactNode, useMemo } from "react";
import { v4 as uuid } from "uuid";
import { Path, useCursor } from "../Scratch/UseCursor";
import { getPathFromPoints } from "../../util/svg";
import styled from "styled-components";
import PatternsDefs, { PatternWithFill } from "./patterns/PatternsDefs";

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
  patterns: Array<PatternWithFill>;
  patternIdBase: string;
}

type DrawWithinRef = {
  removeLastPath: () => void;
};

const DrawWithin = forwardRef<DrawWithinRef, DrawWithinProps>(
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
    const { paths, ref, removeLastPath } = useCursor({
      generateMultiplePaths: true,
      pathOptions: { strokeColor, patternIndex },
    });
    const refResult: DrawWithinRef = { removeLastPath };

    if (forwardedRef) {
      if (typeof forwardedRef === "function") {
        forwardedRef(refResult);
      } else {
        forwardedRef.current = refResult;
      }
    }

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
      <StContainer className={className}>
        <StSvg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={viewBox}
          ref={ref}
          height="100%"
        >
          <PatternsDefs patterns={patterns} patternIdBase={patternIdBase} />
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
