import React, { forwardRef, ReactNode, useMemo } from "react";
import { v4 as uuid } from "uuid";
import { Path, useCursor } from "../Scratch/UseCursor";
import { getPathFromPoints } from "../../util/svg";
import styled from "styled-components";
import PatternsDefs, { PatternWithFill } from "./assets/patterns/PatternsDefs";
import { PropsWithClassName } from "../../lib";
import Brush, { brushMove } from "./Brush";

export const StSvg = styled.svg`
  height: 100%;
`;

const StContainer = styled.section`
  display: grid;
  height: 100%;
  width: 100%;
  position: relative;

  &,
  * {
    box-sizing: border-box;
  }
`;

const StBrush = styled(Brush)`
  position: absolute;
  pointer-events: none;
  z-index: 1;
  width: 70px;
  height: 70px;
  //transform: translate(50%, 50%);
  top: 30%;
  left: 20%;
  animation: ${brushMove} 4s ease-in-out forwards;
`;

export interface DrawWithinProps {
  strokeWidth?: number;
  strokeColor?: string;
  viewBox: string;
  ImagePaths: ReactNode;
  MaskPaths: ReactNode;
  patternIndex?: number | null;
  patterns: Array<PatternWithFill>;
  patternIdBase: string;
  showBrushAnimation?: boolean;
}

type DrawWithinRef = {
  removeLastPath: () => void;
};

const DrawWithin = forwardRef<
  DrawWithinRef,
  PropsWithClassName<DrawWithinProps>
>(
  (
    {
      strokeWidth = 6,
      strokeColor = "hotpink",
      viewBox,
      MaskPaths,
      ImagePaths,
      className,
      patternIndex,
      patterns,
      patternIdBase,
      showBrushAnimation = true,
    },
    forwardedRef
  ) => {
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
        {showBrushAnimation && <StBrush />}
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
