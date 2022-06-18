import {
  Ref,
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";

export type Point = {
  x: number;
  y: number;
  type?: string;
};

export type Payload = Point;

export type State = {
  points: Array<Point>;
};

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
      const { x, y } = payload;
      return { ...state, points: [...state.points, { x, y }] };
    default:
      throw new Error("don't know");
  }
}

export function useCursor(node?: HTMLOrSVGElement) {
  const [state, pointsDispatch] = useReducer(cursorReducer, initialState);
  const [isDrawing, setIsDrawing] = useState(false);
  useLayoutEffect(() => {
    console.log("A", node);
  }, []);
  const addPoint = useCallback((point: Point) => {
    const action: Action = { type: "addPoint", payload: point };
    pointsDispatch(action);
  }, []);

  useEffect(() => {});
  return { points: state.points, addPoint };
}
