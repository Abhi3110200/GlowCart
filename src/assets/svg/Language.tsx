import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = ({width, height ,...props}: any) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="#4B4B4B"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 8.38H11.5M11.5 8.38H14.5M11.5 8.38V7M17 8.38H14.5M14.5 8.38C13.973 10.266 12.868 12.049 11.607 13.616M11.607 13.616C10.563 14.913 9.412 16.063 8.393 17M11.607 13.616C10.964 12.862 10.064 11.643 9.807 11.091M11.607 13.616L13.536 15.621"
      stroke="#4B4B4B"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
