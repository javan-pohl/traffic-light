import React, { Fragment } from "react";

export default function ChangeButton({ getColor, isLoading }) {
  const buttonText = () => {
    if (isLoading) {
      return (
        <div
          className="change-button pulsing-continous"
          onClick={() => getColor()}
        >
          Loading...
        </div>
      );
    } else {
      return (
        <div className="change-button" onClick={() => getColor()}>
          Get Random Color
        </div>
      );
    }
  };
  return <React.Fragment>{buttonText()}</React.Fragment>;
}
