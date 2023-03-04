import { useCallback, useEffect, useReducer, useRef } from "react";
import { getPointInSvgFromEvent } from "../../util/svg";

export type Point = {
  x: number;
  y: number;
  type?: string;
};

export type Path = {
  points: Array<Point>;
};

export type Payload = Point;

export type MouseOrTouchEvent = TouchEvent | MouseEvent;

export type Action = {
  type: string;
  payload?: Payload;
};

export type State = {
  paths: Array<Path>;
};

export type DrawOptions = {
  type?: string;
};

const initialState = {
  paths: [],
  testProp: 5,
};

function cursorReducer(
  state: State,
  { type, payload = {} as Payload }: Action
) {
  switch (type) {
    case "addPath":
      return {
        ...state,
        paths: [...state.paths, { points: [] }],
      };
    case "addPoint":
      const { x, y, type } = payload;
      const lastPath = state.paths[state.paths.length - 1] || { points: [] };
      const allButLast = state.paths.slice(0, state.paths.length - 1);
      return {
        ...state,
        paths: [
          ...allButLast,
          { ...lastPath, points: [...lastPath.points, { x, y, type }] },
        ],
      };
    case "clearPoints":
      return { ...state, paths: [] };
    default:
      throw new Error("don't know");
  }
}

interface useCursorArgs {
  threshold?: number;
  generateMultiplePaths?: boolean;
}
export function useCursor(args: useCursorArgs = {}) {
  const { threshold = 25, generateMultiplePaths } = args;
  const [state, pointsDispatch] = useReducer(cursorReducer, initialState);
  const isDrawingRef = useRef<boolean>();
  const nodeRef = useRef<SVGSVGElement>(null);
  const timeRef = useRef<number>(0);

  const addPath = useCallback(() => {
    const action: Action = { type: "addPath" };
    pointsDispatch(action);
  }, []);

  const addPoint = useCallback((point: Point) => {
    const action: Action = { type: "addPoint", payload: point };
    pointsDispatch(action);
  }, []);

  const clearPoints = useCallback(() => {
    const action: Action = { type: "clearPoints" };
    pointsDispatch(action);
  }, []);

  const draw = useCallback(
    (e: MouseOrTouchEvent, options: DrawOptions = {}) => {
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
    },
    [addPoint, threshold]
  );

  const startDrawing = useCallback(
    (e: MouseOrTouchEvent) => {
      isDrawingRef.current = true;
      if (generateMultiplePaths) {
        addPath();
      }
      draw(e, { type: "M" });
    },
    [addPath, draw, generateMultiplePaths]
  );

  const stopDrawing = useCallback(
    (e: MouseOrTouchEvent) => {
      draw(e);
      isDrawingRef.current = false;
    },
    [draw]
  );

  useEffect(() => {
    const node = nodeRef?.current;
    const listeners = new Map<keyof SVGSVGElementEventMap, EventListener>([
      ["touchstart", startDrawing as EventListener],
      ["mousedown", startDrawing as EventListener],
      ["mouseup", stopDrawing as EventListener],
      ["touchend", stopDrawing as EventListener],
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
  }, [draw, startDrawing, stopDrawing]);

  return { paths: state.paths, addPoint, ref: nodeRef, clearPoints };
}
