import { useCallback, useEffect, useReducer, useRef } from "react";

export type Point = {
  x: number;
  y: number;
  type?: string;
};

export type Payload = Point;

export type State = {
  points: Array<Point>;
};

export type MouseOrTouchEvent = TouchEvent | MouseEvent;

const initialState = {
  points: [],
  testProp: 5,
};

export type Action = {
  type: string;
  payload: Payload;
};

function cursorReducer(state: State, { type, payload }: Action) {
  switch (type) {
    case "addPoint":
      const { x, y, type } = payload;
      return { ...state, points: [...state.points, { x, y, type }] };
    default:
      throw new Error("don't know");
  }
}

function getPointInSvgFromEvent(svg: SVGSVGElement, event: MouseOrTouchEvent) {
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

export function useCursor(threshold: number = 25) {
  const [state, pointsDispatch] = useReducer(cursorReducer, initialState);
  const isDrawingRef = useRef<boolean>();
  const nodeRef = useRef<SVGSVGElement>();
  const timeRef = useRef<number>(0);
  const addPoint = useCallback((point: Point) => {
    const action: Action = { type: "addPoint", payload: point };
    pointsDispatch(action);
  }, []);

  function startDrawing(e: MouseOrTouchEvent) {
    isDrawingRef.current = true;
    draw(e);
  }

  function stopDrawing(e: MouseOrTouchEvent) {
    draw(e, { type: "Z" });
    isDrawingRef.current = false;
  }

  type DrawOptions = {
    type?: string;
  };

  function draw(e: MouseOrTouchEvent, options: DrawOptions = {}) {
    const node = nodeRef?.current;
    const isDrawing = isDrawingRef.current;
    const lastTimeDrawn = timeRef.current;
    const { type } = options;
    const now = Date.now();
    const msSinceLastTime = now - lastTimeDrawn;
    if (node && msSinceLastTime > threshold) {
      const [x, y] = getPointInSvgFromEvent(node, e);
      if (isDrawing) {
        addPoint({ x, y, type });
        timeRef.current = Date.now();
      }
    }
  }

  useEffect(() => {
    const node = nodeRef?.current;
    const listeners = new Map<keyof SVGSVGElementEventMap, EventListener>([
      ["touchstart", startDrawing as EventListener],
      ["mousedown", startDrawing as EventListener],
      ["mouseup", stopDrawing as EventListener],
      ["mousemove", draw as EventListener],
      ["touchmove", draw as EventListener],
    ]);

    if (node) {
      for (const entry of listeners.entries()) {
        const [type, method] = entry;
        node.addEventListener(type, method);
      }
    }

    return () => {
      if (node) {
        for (const entry of listeners.entries()) {
          const [type, method] = entry;
          node.removeEventListener(type, method);
        }
      }
    };
  }, []);

  return { points: state.points, addPoint, ref: nodeRef };
}
