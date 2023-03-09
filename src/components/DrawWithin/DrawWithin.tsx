import React, { forwardRef, ReactNode, useMemo } from "react";
import { v4 as uuid } from "uuid";
import { Path, useCursor } from "../Scratch/UseCursor";
import { getPathFromPoints } from "../../util/svg";
import styled from "styled-components";
import Patterns, { Pattern } from "./patterns/Patterns";

const StPath = styled.path`
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: transparent;
`;

const StSvg = styled.svg`
  height: 100%;
`;

const StContainer = styled.section`
  height: 100%;
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
    } = props;
    const clipPathId = useMemo(() => uuid(), []);
    const pathId = useMemo(() => uuid(), []);
    const { paths, ref } = useCursor({
      generateMultiplePaths: true,
      pathOptions: { strokeColor, patternIndex },
    });

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
    const pattern_id_base = useMemo(() => uuid(), []);
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
        <StSvg viewBox={viewBox} ref={ref}>
          <Patterns patterns={patterns} pattern_id_base={pattern_id_base} />
          <g clipPath={`url(#${clipPathId})`} width="100%" height="100%">
            {allPaths.map(({ path, pathOptions }, index) => {
              const { patternIndex, strokeColor } = pathOptions;
              return (
                <StPath
                  key={index}
                  d={path}
                  id={`${pathId}_${index}`}
                  strokeWidth={strokeWidth}
                  stroke={
                    Number.isInteger(patternIndex)
                      ? `url(#${pattern_id_base}_${patternIndex})`
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
