import {
  patternMap,
  PatternType,
} from "../components/DrawWithin/patterns/data";
import React, { ChangeEvent } from "react";

interface ColorPatternPickerProps {
  color: string;
  pattern: PatternType;
  setColor: (color: string) => void;
  setPattern: (pattern: PatternType) => void;
}
export function ColorPatternPicker(props: ColorPatternPickerProps) {
  const { color, pattern, setColor, setPattern } = props;
  return (
    <div>
      <select
        value={pattern}
        onChange={(event) => {
          setPattern(event.target.value);
        }}
      >
        {Object.keys(patternMap).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <input
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
        }}
      />
    </div>
  );
}

export default ColorPatternPicker;
