import React, { forwardRef, ReactNode, useMemo } from "react";
import { v4 as uuid } from "uuid";
import { Path, useCursor } from "../Scratch/UseCursor";
import { getPathFromPoints } from "../../util/svg";
import styled from "styled-components";

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
    } = props;
    const clipPathId = useMemo(() => uuid(), []);
    const pathId = useMemo(() => uuid(), []);
    const { paths, ref } = useCursor({
      generateMultiplePaths: true,
      pathOptions: { strokeColor },
    });

    const allPaths = useMemo(
      () =>
        paths.map(
          (path) => {
            const { points, pathOptions } = path as Path;
            console.log(path);
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
        <StSvg viewBox={viewBox} ref={ref}>
          <g clipPath={`url(#${clipPathId})`} width="100%" height="100%">
            {allPaths.map(({ path, pathOptions }, index) => (
              <StPath
                key={index}
                d={path}
                id={`${pathId}_${index}`}
                strokeWidth={strokeWidth}
                stroke={pathOptions?.strokeColor}
              />
            ))}
          </g>
          {ImagePaths}
          <clipPath id={clipPathId}>{MaskPaths}</clipPath>
        </StSvg>
      </StContainer>
    );
  }
);
export default DrawWithin;
