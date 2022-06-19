import React, { Ref, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Point, useCursor } from "./UseCursor";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import MaskPaths from "./MaskPaths";

const strokeWidth = 60;

export interface ScratchProps {
  label?: string;
  fluid?: boolean;
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

const getPathFromPoints = (points: Array<Point>) => {
  return points.reduce((path, point, index) => {
    const { x, y } = point;
    const isNotFirstPoint = index > 0;
    const previousPoint = isNotFirstPoint
      ? points[index - 1]
      : { x: null, y: null, type: null };
    const { x: x0, y: y0, type: lastType } = previousPoint;
    const needToOpen = index === 0 || lastType === "Z";
    const isSameAsLast = x0 === x && y0 === y;

    if (needToOpen) {
      return `${path} M ${x} ${y}`;
    } else if (isSameAsLast) {
      return `${path} L ${x + 5} ${y0 + 5}`;
    } else {
      return `${path} L ${x} ${y}`;
    }
  }, "");
};

function Scratch(props: ScratchProps) {
  const maskId = useMemo(() => uuidv4(), []);
  const { points, ref } = useCursor();
  const path = useMemo(() => getPathFromPoints(points), [points]);

  // @ts-ignore
  return (
    <SvgContainer>
      <StSvg
        viewBox={`0 0 1600 1600`}
        id="Layer_1"
        ref={ref as Ref<SVGSVGElement>}
      >
        <defs>
          <radialGradient
            id="GradientReflect"
            cx="0.5"
            cy="0.5"
            r="0.4"
            fx="0.75"
            fy="0.75"
            spreadMethod="reflect"
          >
            <stop offset="0%" stopColor="hotpink" />
            <stop offset="100%" stopColor="forestgreen" />
          </radialGradient>
        </defs>
        <clipPath id={maskId}>
          <MaskPaths />
        </clipPath>

        <g clipPath={`url(#${maskId})`}>
          <path
            d={path}
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
  label: "I'm a label",
  fluid: false,
};

export default Scratch;
