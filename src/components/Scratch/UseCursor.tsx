import { useCallback, useEffect, useReducer, useRef } from "react";
import { getPointInSvgFromEvent } from "../../util/svg";

export type Point = {
  x: number;
  y: number;
  type?: string;
};

export type Path = {
  points: Array<Point>;
  pathOptions?: PathOptions;
};

export type Payload = any;

export type MouseOrTouchEvent = TouchEvent | MouseEvent;

export interface PathOptions {
  strokeColor?: string;
}

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
};

function cursorReducer(
  state: State,
  { type: actionType, payload = {} as Payload }: Action
) {
  const { x, y, type: pointType, pathOptions } = payload;
  switch (actionType) {
    case "addPath":
      return {
        ...state,
        paths: [...state.paths, { points: [], pathOptions }],
      };
    case "addPoint":
      const lastPath = state.paths[state.paths.length - 1];
      const allButLast = state.paths.slice(0, state.paths.length - 1);
      return {
        ...state,
        paths: [
          ...allButLast,
          {
            ...lastPath,
            points: [...lastPath.points, { x, y, type: pointType }],
          },
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
  pathOptions?: PathOptions;
}
export function useCursor(args: useCursorArgs = {}) {
  const { threshold = 25, generateMultiplePaths, pathOptions } = args;
  const [state, pointsDispatch] = useReducer(cursorReducer, initialState);
  const isDrawingRef = useRef<boolean>();
  const nodeRef = useRef<SVGSVGElement | null>(null);
  const timeRef = useRef<number>(0);
  const { paths } = state;
  console.log(state);

  const addPath = useCallback((options?: PathOptions) => {
    const action: Action = {
      type: "addPath",
      payload: { pathOptions: options },
    };
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
      if (generateMultiplePaths || !paths.length) {
        addPath(pathOptions);
      }
      draw(e, { type: "M" });
    },
    [addPath, draw, generateMultiplePaths, pathOptions, paths]
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
