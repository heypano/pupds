import React, { Ref, useMemo } from "react";
import { Point, useCursor } from "./UseCursor";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const strokeWidth = 60;

export interface ScratchProps {
  text?: string;
  drawText?: boolean;
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
  const { text = "Hey there howi", drawText } = props;
  const maskId = useMemo(() => uuidv4(), []);
  const pathId = useMemo(() => uuidv4(), []);
  const { points, ref } = useCursor();
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
  text: "Fight own tail roll over and sun my belly chase after silly colored fish toys around the house and scratch at door to be let outside, get let out then scratch at door immmediately after to be let back in so spill litter box, scratch at owner, destroy all furniture, especially couch. Purr as loud as possible, be the most annoying cat that you can, and, knock everything off the table stare out the window freak human out make funny noise mow mow mow mow mow mow success now attack human yet climb into cupboard and lick the salt off rice cakes yet purrr purr littel cat, little cat purr purr so miaow then turn around and show you my bum i want to go outside let me go outside nevermind inside is better. What the heck just happened, something feels fishy give attitude. Is good you understand your place in my world always ensure to lay down in such a manner that tail can lightly brush human's nose , pose purrfectly to show my beauty. Catch mouse and gave it as a present scratch the box, jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed. Russian blue roll over and sun my belly. Jump on human and sleep on her all night long be long in the bed, purr in the morning and then give a bite to every human around for not waking up request food, purr loud scratch the walls, the floor, the windows, the humans ignore the human until she needs to get up, then climb on her lap and sprawl, purr like an angel yet sleeps on my head hell is other people.",
  drawText: false,
};

export default Scratch;
