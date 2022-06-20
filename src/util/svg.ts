import { MouseOrTouchEvent } from "../components/Scratch/UseCursor";

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
