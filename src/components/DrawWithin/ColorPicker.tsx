import React from "react";
import { CustomPicker } from "react-color";
import { Alpha, Hue, Saturation } from "react-color/lib/components/common";
import { InjectedColorProps } from "react-color/lib/components/common/ColorWrap";
import styled from "styled-components";

const StSlider = styled.section<{ tall?: boolean }>`
  position: relative;
  height: ${({ tall }) => (tall ? `40px` : `20px;`)};
  margin: 10px 0px;
`;

const CustomSliderPointer = styled.div<{ direction?: "vertical" }>`
  height: 20px;
  width: 10px;
  transform: translateX(-50%);
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
`;
const circleSize = "15px";
const CustomCirclePointer = styled.div<{ direction?: "vertical" }>`
  --size: 15px;
  height: ${circleSize};
  width: ${circleSize};
  transform: translateX(-50%) translateY(-50%);
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
`;
const ColorPicker: React.FC<InjectedColorProps> = (props) => {
  return (
    <div>
      <StSlider>
        <Hue
          {...props}
          pointer={CustomSliderPointer}
          onChange={(colorResult) => {
            props.onChange?.(colorResult);
          }}
        />
      </StSlider>
      <StSlider tall>
        <Saturation
          {...props}
          pointer={CustomCirclePointer}
          onChange={(colorResult) => {
            props.onChange?.(colorResult);
          }}
        />
      </StSlider>
      <StSlider>
        <Alpha
          {...props}
          pointer={CustomSliderPointer}
          onChange={(colorResult) => {
            props.onChange?.(colorResult);
          }}
        />
      </StSlider>
    </div>
  );
};

export default CustomPicker(ColorPicker);
