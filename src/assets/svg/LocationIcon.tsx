import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = ({width, height ,...props}: any) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 18 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M3.4 3.76C4.89031 2.29949 6.8968 1.48613 8.98343 1.49667C11.0701 1.50721 13.0682 2.34079 14.5437 3.81628C16.0192 5.29177 16.8528 7.28994 16.8633 9.37657C16.8739 11.4632 16.0605 13.4697 14.6 14.96L10.414 19.146C10.0389 19.5209 9.53032 19.7316 9 19.7316C8.46967 19.7316 7.96105 19.5209 7.586 19.146L3.4 14.96C1.91488 13.4747 1.08057 11.4604 1.08057 9.36C1.08057 7.25962 1.91488 5.24526 3.4 3.76Z"
      stroke="#4B4B4B"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <Path
      d="M9 12.36C10.6569 12.36 12 11.0168 12 9.35998C12 7.70313 10.6569 6.35999 9 6.35999C7.34315 6.35999 6 7.70313 6 9.35998C6 11.0168 7.34315 12.36 9 12.36Z"
      stroke="#4B4B4B"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
