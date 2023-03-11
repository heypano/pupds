import styled from "styled-components";
import React from "react";

interface PatternPickerProps {
  top: number;
  left: number;
}

const StPatternPickerContainer = styled.section<PatternPickerProps>`
  position: absolute;
  display: grid;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
`;

export function PatternPicker(props: PatternPickerProps) {
  return (
    <StPatternPickerContainer top={0} left={0}>
      bla
    </StPatternPickerContainer>
  );
}

export default PatternPicker;
