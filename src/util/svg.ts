import { MouseOrTouchEvent, Point } from "../components/Scratch/UseCursor";

export function getPointInSvgFromEvent(
  svg: SVGSVGElement,
  event: MouseOrTouchEvent
) {
  let x: number;
  let y: number;
  if (window.TouchEvent && event instanceof TouchEvent) {
    const { touches } = event as TouchEvent;
    x = touches[0]?.clientX;
    y = touches[0]?.clientY;
  } else {
    const { clientX, clientY } = event as MouseEvent;
    x = clientX;
    y = clientY;
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
    const { x, y, type } = point;
    const isNotFirstPoint = index > 0;
    const previousPoint = isNotFirstPoint
      ? points[index - 1]
      : { x: null, y: null, type: null };
    const { x: x0, y: y0 } = previousPoint;
    const needToOpen = type === "M";
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
