import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Color, ColorResult, HSLColor } from "react-color";
import ColorPicker from "./ColorPicker";
import { PatternType } from "./patterns/data";
import { PatternWithFill } from "./patterns/PatternsDefs";
import PatternPicker from "./PatternPicker";

const StContainer = styled.section`
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  &,
  * {
    box-sizing: border-box;
  }
`;

type ColorPatternPickerProps = {
  color: string;
  patternType: PatternType;
  onChange: (patternWithFill: PatternWithFill) => void;
};

const hslToCss = ({ h, s, l, a }: HSLColor): string => {
  const saturation = (s * 100).toFixed(1);
  const lightness = (l * 100).toFixed(1);
  const alpha = a?.toFixed(2) ?? "1";

  return `hsla(${h.toFixed(1)}, ${saturation}%, ${lightness}%, ${alpha})`;
};

export function ColorPatternPicker({
  color,
  patternType,
  onChange,
}: ColorPatternPickerProps) {
  return (
    <StContainer>
      <ColorPicker
        color={color}
        onChange={(colorResult) => {
          onChange({ type: patternType, fill: hslToCss(colorResult.hsl) });
        }}
      />
      <PatternPicker
        fill={color}
        selectedPattern={patternType}
        onSelect={(patternType) => onChange({ type: patternType, fill: color })}
      />
    </StContainer>
  );
}

export default ColorPatternPicker;
