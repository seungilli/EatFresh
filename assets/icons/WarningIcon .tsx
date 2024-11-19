import React from "react";
import Svg, { Path, Circle } from "react-native-svg";

const WarningIcon = ({ width = 80, height = 80 }) => {
  return (
    <Svg fill="none" viewBox="0 0 80 80" width={width} height={height}>
      <Path
        fill="#607e46"
        d="M40.65 12.63c-.27-.47-1.04-.47-1.3 0L13 58.63a.77.77 0 0 0 0 .75c.13.23.38.37.65.37h52.71a.745.745 0 0 0 .65-1.12l-26.36-46zM14.94 58.25L40 14.51l25.06 43.74H14.94z"
      />
      <Circle cx="40" cy="48.94" r="2" fill="#607e46" />
      <Path
        fill="#607e46"
        d="M38.5 28.88v14.17c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V28.88c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5z"
      />
    </Svg>
  );
};

export default WarningIcon;
