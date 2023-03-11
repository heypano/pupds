import React from "react";
import { patternMap, PatternType } from "./data";

export interface Pattern {
  type: PatternType;
  fill: string;
}
interface PatternProps {
  patterns: Array<Pattern>;
  patternIdBase?: string;
}

export function Patterns(props: PatternProps) {
  const { patterns, patternIdBase } = props;

  return (
    <defs>
      {patterns.map((pattern, index) => {
        const { fill, type } = pattern;
        const { width, height, Content } = patternMap[type];
        return (
          <pattern
            id={`${patternIdBase}_${index}`}
            x="0"
            y="0"
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
          >
            <Content fill={fill} />
          </pattern>
        );
      })}
    </defs>
  );
}

export default Patterns;
