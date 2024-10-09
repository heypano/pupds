import React from "react";
import { keyframes } from "styled-components";

export const brushMove = keyframes`
  0% {
    transform: translate(0%, 0%);
  }
  20% {
    transform: translate(100%, 100%);
  }
  40% {
    transform: translate(100%, 0%);
  }
  60% {
    transform: translate(200%, 100%);
  }
  80% {
    transform: translate(200%, 0%);
  }
  100% {
    transform: translate(300%, 100%);
    opacity: 0; /* Fade out at the end */
  }
`;

export const Brush: React.FC<React.SVGProps<SVGSVGElement>> = ({
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      height="32"
      width="32"
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
      />
    </svg>
  );
};

export default Brush;
