import React, { ReactNode, useMemo } from "react";
import { v4 as uuid } from "uuid";
import { useCursor } from "../Scratch/UseCursor";
import { getPathFromPoints } from "../../util/svg";
import styled from "styled-components";

const StPath = styled.path`
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: transparent;
`;

interface DrawWithinProps {
  strokeWidth?: number;
  strokeColor?: string;
  viewBox: string;
  ImagePaths: ReactNode;
  MaskPaths: ReactNode;
}

function DrawWithin(props: DrawWithinProps) {
  const {
    strokeWidth = 6,
    strokeColor = "hotpink",
    viewBox,
    MaskPaths,
    ImagePaths,
  } = props;
  const clipPathId = useMemo(() => uuid(), []);
  const pathId = useMemo(() => uuid(), []);
  const { paths, ref } = useCursor({
    generateMultiplePaths: true,
    pathOptions: { strokeColor },
  });
  const allPaths = useMemo(
    () => paths.map(({ points }) => getPathFromPoints(points), [paths]),
    [paths]
  );
  return (
    <svg viewBox={viewBox} ref={ref}>
      <g clipPath={`url(#${clipPathId})`} width="100%" height="100%">
        {allPaths.map((path, index) => (
          <StPath
            key={index}
            d={path}
            id={`${pathId}_${index}`}
            strokeWidth={strokeWidth}
            stroke={strokeColor}
          />
        ))}
      </g>
      {ImagePaths}
      <clipPath id={clipPathId}>{MaskPaths}</clipPath>
    </svg>
  );
}
export default DrawWithin;
