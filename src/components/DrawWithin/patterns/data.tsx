import React, { FunctionComponent } from "react";

export interface PatternContentProps {
  fill: string;
}
export type PatternContent = FunctionComponent<PatternContentProps>;
export interface PatternData {
  width: number;
  height: number;
  Content: PatternContent;
}

export const patternMap: PatternMap = {
  solid: {
    width: 1,
    height: 1,
    Content: ({ fill }) => (
      <g>
        <g fill={fill}>
          <rect x="0" y="0" width="100" height="100" />
        </g>
      </g>
    ),
  },
  dominoes: {
    width: 126,
    height: 83,
    Content: ({ fill }) => (
      <g fillRule="evenodd">
        <g fill={fill}>
          <path d="M126 83v1H0v-2h40V42H0v-2h40V0h2v40h40V0h2v40h40V0h2v83zm-2-1V42H84v40h40zM82 42H42v40h40V42zm-50-6a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm96 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm-42 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm30-12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM20 54a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm12 24a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM8 54a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm24 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM8 78a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm12 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm54 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM50 54a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm24 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM50 78a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm54-12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm12 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM92 54a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm24 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM92 78a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm24-42a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
        </g>
      </g>
    ),
  },
  bankNote: {
    width: 100,
    height: 20,
    Content: ({ fill }) => (
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="bank-note" fill={fill}>
          <path d="M21.1841339,20 C21.5411448,19.869748 21.9037256,19.7358773 22.272392,19.5983261 C22.6346445,19.4631679 23.8705367,18.9999982 24.0399055,18.9366758 C33.6397477,15.3475548 39.6469349,14 50,14 C60.2711361,14 65.3618399,15.2217689 74.6286093,18.9284767 C75.584355,19.310775 76.4978747,19.6675274 77.3787841,20 L83.604005,20 C81.0931362,19.2694473 78.4649665,18.3089537 75.3713907,17.0715233 C65.8881601,13.2782311 60.5621972,12 50,12 C39.3741437,12 33.144814,13.3973866 23.3395101,17.0633242 C23.1688625,17.1271247 21.9338538,17.5899633 21.5732596,17.7245028 C19.0984715,18.6478581 16.912678,19.3994574 14.8494171,20 L21.1841339,20 L21.1841339,20 Z M21.1841339,0 C13.2575214,2.89194861 8.07672845,4 7.87150385e-14,4 L7.81597009e-14,4 L0,2 C5.74391753,2 9.9514017,1.4256397 14.8494171,1.40165657e-15 L21.1841339,6.9388939e-17 L21.1841339,0 Z M77.3787841,2.21705987e-12 C85.238555,2.9664329 90.5022896,4 100,4 L100,2 C93.1577329,2 88.6144135,1.4578092 83.604005,1.04805054e-13 L77.3787841,0 L77.3787841,2.21705987e-12 Z M7.87150385e-14,14 C8.44050043,14 13.7183277,12.7898887 22.272392,9.59832609 C22.6346445,9.46316794 23.8705367,8.99999822 24.0399055,8.9366758 C33.6397477,5.34755477 39.6469349,4 50,4 C60.2711361,4 65.3618399,5.2217689 74.6286093,8.92847669 C84.1118399,12.7217689 89.4378028,14 100,14 L100,12 C89.7288639,12 84.6381601,10.7782311 75.3713907,7.07152331 C65.8881601,3.2782311 60.5621972,2 50,2 C39.3741437,2 33.144814,3.39738661 23.3395101,7.0633242 C23.1688625,7.12712472 21.9338538,7.58996334 21.5732596,7.72450279 C13.2235239,10.8398294 8.16350991,12 0,12 L7.81597009e-14,14 L7.87150385e-14,14 L7.87150385e-14,14 Z"></path>
        </g>
      </g>
    ),
  },
  morphingDiamonds: {
    width: 60,
    height: 60,
    Content: ({ fill }) => (
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="morphing-diamonds" fill={fill}>
          <path d="M54.627417,1.33226763e-15 L55.4558441,0.828427125 L54.0416306,2.24264069 L51.7989899,-1.44328993e-15 L54.627417,7.10542736e-15 L54.627417,1.33226763e-15 Z M5.372583,-5.55111512e-16 L4.54415588,0.828427125 L5.95836944,2.24264069 L8.20101013,-1.44328993e-15 L5.372583,-7.77156117e-16 L5.372583,-5.55111512e-16 Z M48.9705627,6.32827124e-15 L52.627417,3.65685425 L51.2132034,5.07106781 L46.1421356,-1.44328993e-15 L48.9705627,5.21804822e-15 L48.9705627,6.32827124e-15 Z M11.0294373,-1.44328993e-15 L7.372583,3.65685425 L8.78679656,5.07106781 L13.8578644,1.22124533e-15 L11.0294373,-3.33066907e-16 L11.0294373,-1.44328993e-15 Z M43.3137085,2.10942375e-15 L49.7989899,6.48528137 L48.3847763,7.89949494 L40.4852814,2.10942375e-15 L43.3137085,-1.44328993e-15 L43.3137085,2.10942375e-15 Z M16.6862915,3.33066907e-16 L10.2010101,6.48528137 L11.6152237,7.89949494 L19.5147186,-3.33066907e-16 L16.6862915,-1.44328993e-15 L16.6862915,3.33066907e-16 Z M37.6568542,2.55351296e-15 L46.9705627,9.3137085 L45.5563492,10.7279221 L34.8284271,-5.55111512e-16 L37.6568542,-1.44328993e-15 L37.6568542,2.55351296e-15 Z M22.3431458,5.55111512e-16 L13.0294373,9.3137085 L14.4436508,10.7279221 L25.1715729,-1.11022302e-16 L22.3431458,-1.44328993e-15 L22.3431458,5.55111512e-16 Z M32,-3.33066907e-16 L44.1421356,12.1421356 L42.7279221,13.5563492 L30,0.828427125 L17.2720779,13.5563492 L15.8578644,12.1421356 L28,-3.33066907e-16 L32,-1.44328993e-15 L32,-3.33066907e-16 Z M0.284271247,-1.44328993e-15 L28.2842712,28 L26.8700577,29.4142136 L-2.15508222e-16,2.54415588 L-2.15508222e-16,4.71844785e-16 L0.284271247,4.71844785e-16 L0.284271247,-1.44328993e-15 Z M1.80408836e-15,5.372583 L25.4558441,30.8284271 L24.0416306,32.2426407 L3.33720546e-15,8.20101013 L-2.15508222e-16,5.372583 L1.80408836e-15,5.372583 Z M-2.15508222e-16,11.0294373 L22.627417,33.6568542 L21.2132034,35.0710678 L4.80878765e-15,13.8578644 L1.25607397e-15,11.0294373 L-2.15508222e-16,11.0294373 Z M-2.15508222e-16,16.6862915 L19.7989899,36.4852814 L18.3847763,37.8994949 L7.73346434e-15,19.5147186 L6.28036983e-16,16.6862915 L-2.15508222e-16,16.6862915 Z M1.66860273e-15,22.3431458 L16.9705627,39.3137085 L15.5563492,40.7279221 L-2.15508222e-16,25.1715729 L-2.15508222e-16,22.3431458 L1.66860273e-15,22.3431458 Z M-2.15508222e-16,28 L14.1421356,42.1421356 L12.7279221,43.5563492 L-2.15508222e-16,30.8284271 L-2.15508222e-16,28 L-2.15508222e-16,28 Z M-2.15508222e-16,33.6568542 L11.3137085,44.9705627 L9.89949494,46.3847763 L5.20282872e-16,36.4852814 L5.20282872e-16,33.6568542 L-2.15508222e-16,33.6568542 Z M-2.15508222e-16,39.3137085 L8.48528137,47.7989899 L7.07106781,49.2132034 L3.55271368e-15,42.1421356 L3.55271368e-15,39.3137085 L-2.15508222e-16,39.3137085 Z M-2.15508222e-16,44.9705627 L5.65685425,50.627417 L4.24264069,52.0416306 L3.55271368e-15,47.7989899 L2.66453526e-15,44.9705627 L-2.15508222e-16,44.9705627 Z M-2.15508222e-16,50.627417 L2.82842712,53.4558441 L1.41421356,54.8700577 L2.48058749e-15,53.4558441 L2.48058749e-15,50.627417 L-2.15508222e-16,50.627417 Z M54.627417,60 L30,35.372583 L5.372583,60 L8.20101013,60 L30,38.2010101 L51.7989899,60 L54.627417,60 L54.627417,60 Z M48.9705627,60 L30,41.0294373 L11.0294373,60 L13.8578644,60 L30,43.8578644 L46.1421356,60 L48.9705627,60 L48.9705627,60 Z M43.3137085,60 L30,46.6862915 L16.6862915,60 L19.5147186,60 L30,49.5147186 L40.4852814,60 L43.3137085,60 L43.3137085,60 Z M37.6568542,60 L30,52.3431458 L22.3431458,60 L25.1715729,60 L30,55.1715729 L34.8284271,60 L37.6568542,60 L37.6568542,60 Z M32,60 L30,58 L28,60 L32,60 L32,60 Z M59.7157288,3.33066907e-16 L31.7157288,28 L33.1299423,29.4142136 L60,2.54415588 L60,-1.44328993e-15 L59.7157288,-1.44328993e-15 L59.7157288,3.33066907e-16 Z M60,5.372583 L34.5441559,30.8284271 L35.9583694,32.2426407 L60,8.20101013 L60,5.372583 L60,5.372583 Z M60,11.0294373 L37.372583,33.6568542 L38.7867966,35.0710678 L60,13.8578644 L60,11.0294373 L60,11.0294373 Z M60,16.6862915 L40.2010101,36.4852814 L41.6152237,37.8994949 L60,19.5147186 L60,16.6862915 L60,16.6862915 Z M60,22.3431458 L43.0294373,39.3137085 L44.4436508,40.7279221 L60,25.1715729 L60,22.3431458 L60,22.3431458 Z M60,28 L45.8578644,42.1421356 L47.2720779,43.5563492 L60,30.8284271 L60,28 L60,28 Z M60,33.6568542 L48.6862915,44.9705627 L50.1005051,46.3847763 L60,36.4852814 L60,33.6568542 L60,33.6568542 Z M60,39.3137085 L51.5147186,47.7989899 L52.9289322,49.2132034 L60,42.1421356 L60,39.3137085 L60,39.3137085 Z M60,44.9705627 L54.3431458,50.627417 L55.7573593,52.0416306 L60,47.7989899 L60,44.9705627 L60,44.9705627 Z M60,50.627417 L57.1715729,53.4558441 L58.5857864,54.8700577 L60,53.4558441 L60,50.627417 L60,50.627417 Z M39.8994949,16.3847763 L41.3137085,14.9705627 L30,3.65685425 L18.6862915,14.9705627 L20.1005051,16.3847763 L30,6.48528137 L39.8994949,16.3847763 L39.8994949,16.3847763 Z M37.0710678,19.2132034 L38.4852814,17.7989899 L30,9.3137085 L21.5147186,17.7989899 L22.9289322,19.2132034 L30,12.1421356 L37.0710678,19.2132034 L37.0710678,19.2132034 Z M34.2426407,22.0416306 L35.6568542,20.627417 L30,14.9705627 L24.3431458,20.627417 L25.7573593,22.0416306 L30,17.7989899 L34.2426407,22.0416306 L34.2426407,22.0416306 Z M31.4142136,24.8700577 L32.8284271,23.4558441 L30,20.627417 L27.1715729,23.4558441 L28.5857864,24.8700577 L30,23.4558441 L31.4142136,24.8700577 L31.4142136,24.8700577 Z M56.8700577,59.4142136 L58.2842712,58 L30,29.7157288 L1.71572875,58 L3.12994231,59.4142136 L30,32.5441559 L56.8700577,59.4142136 L56.8700577,59.4142136 Z"></path>
        </g>
      </g>
    ),
  },
  diagonalLines: {
    width: 6,
    height: 6,
    Content: ({ fill }) => (
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g fill={fill}>
          <polygon points="5 0 6 0 0 6 0 5"></polygon>
          <polygon points="6 5 6 6 5 6"></polygon>
        </g>
      </g>
    ),
  },
  curtain: {
    width: 44,
    height: 12,
    Content: ({ fill }) => (
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g fill={fill}>
          <path d="M20,12 L20,10 L0,0 L0,10 L4,12 L20,12 L20,12 Z M38,12 L42,10 L42,0 L22,10 L22,12 L38,12 Z M20,0 L20,8 L4,1.77635684e-15 L20,0 L20,0 Z M38,8.8817842e-16 L22,8 L22,0 L38,5.55111512e-16 L38,8.8817842e-16 Z"></path>
        </g>
      </g>
    ),
  },
  melt: {
    width: 24,
    height: 20,
    Content: ({ fill }) => (
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g fill={fill}>
          <path d="M20,18 C20,16.8954305 20.8869711,16 21.998291,16 C23.1019167,16 23.9981111,15.1052949 23.9999902,14.0057373 L24,14 L24,20 L20,20 L20,18 Z M0,13.9981014 C0,12.8945804 0.887729645,12 2,12 C3.1045695,12 4,12.8877296 4,14 C4,15.1045695 4.88772964,16 6,16 C7.1045695,16 8,16.8877296 8,18 L8,20 L0,20 L0,13.9981014 Z M16,18.0018986 C16,19.1054196 15.1122704,20 14,20 C12.8954305,20 12,19.1132936 12,18.0018986 L12,13.9981014 C12,12.8945804 11.1122704,12 10,12 C8.8954305,12 8,11.1122704 8,10 C8,8.8954305 7.11227036,8 6,8 C4.8954305,8 4,7.11329365 4,6.00189865 L4,1.99810135 C4,0.894580447 3.11227036,-3.55271368e-15 2,0 C0.8954305,0 2.84217094e-14,0.894705057 3.55271368e-15,2 L0,0 L8,-1.42108547e-14 L8,2 C8,3.1045695 8.88772964,4 10,4 C11.1045695,4 12,4.88772964 12,6 C12,7.1045695 12.8877296,8 14,8 C15.1045695,8 16,7.11227036 16,6 C16,4.8954305 16.8877296,4 18,4 C19.1045695,4 20,3.11227036 20,2 L20,-3.55271368e-15 L24,-3.55271368e-15 L24,6.00189865 C24,7.10541955 23.1122704,8 22,8 C20.8954305,8 20,8.88772964 20,10 C20,11.1045695 19.1122704,12 18,12 C16.8954305,12 16,12.8867064 16,13.9981014 L16,18.0018986 Z"></path>
        </g>
      </g>
    ),
  },
};

export type PatternType = keyof typeof patternMap;

export interface PatternMap {
  [patternName: string]: PatternData;
}
