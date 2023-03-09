import React, { useMemo } from "react";
import { patternMap, PatternType } from "./data";

export interface Pattern {
  type: PatternType;
  fill: string;
}
interface PatternProps {
  patterns: Array<Pattern>;
  pattern_id_base?: string;
}

export function Patterns(props: PatternProps) {
  const { patterns, pattern_id_base } = props;

  return (
    <defs>
      {patterns.map((pattern, index) => {
        const { fill, type } = pattern;
        const { width, height, Content } = patternMap[type];
        return (
          <pattern
            id={`${pattern_id_base}_${index}`}
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
