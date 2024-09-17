import React, { useState } from "react";
import styled from "styled-components";
import { ColorResult } from "react-color";
import ColorPicker from "./ColorPicker";

const StContainer = styled.section`
  cursor: pointer;
  position: relative;
  width: 100%;
  &,
  * {
    box-sizing: border-box;
  }
`;

export function ColorPatternPicker() {
  const [colorResult, setColorResult] = useState<ColorResult>();

  return (
    <StContainer>
      <ColorPicker
        color={colorResult?.hsl}
        onChange={(color) => setColorResult(color)}
      />
    </StContainer>
  );
}

export default ColorPatternPicker;
