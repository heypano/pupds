import { MouseOrTouchEvent, Point } from "../components/Scratch/UseCursor";

export function getPointInSvgFromEvent(
  svg: SVGSVGElement,
  event: MouseOrTouchEvent
) {
  let x: number;
  let y: number;
  if (event instanceof TouchEvent) {
    const { touches } = event as TouchEvent;
    x = touches[0].clientX;
    y = touches[0].clientY;
  } else {
    x = event.clientX;
    y = event.clientY;
  }
  return getPointInSvg(svg, x, y);
}

function getPointInSvg(svg: SVGSVGElement, otherX: number, otherY: number) {
  const pt = svg.createSVGPoint();

  pt.x = otherX;
  pt.y = otherY;
  const { x, y } = pt.matrixTransform(svg.getScreenCTM()?.inverse());
  return [x, y];
}

export const getPathFromPoints = (points: Array<Point>) => {
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
