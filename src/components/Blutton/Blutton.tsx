import React from "react";
import styled from "styled-components";

export interface BluttonProps {
  label?: string;
  fluid?: boolean;
}

const Internal = styled.div<BluttonProps>`
  padding: 20px;
  background: hotpink;
  display: ${({ fluid }) => (fluid ? "block" : "inline-block")};
`;

const Blutton = (props: BluttonProps) => {
  const { label } = props;
  return <Internal {...props}>{label}</Internal>;
};

Blutton.defaultProps = {
  label: "I'm a label",
  fluid: false,
};

export default Blutton;
