import React, { Fragment } from "react";

export default function ChangeButton({ getColor, isLoading }) {
  const buttonText = () => {
    if (isLoading) {
      return (
        <div className="change-button" onClick={() => getColor()}>
          Loading...
        </div>
      );
    } else {
      return (
        <div className="change-button" onClick={() => getColor()}>
          <p>
            Get <br /> Random <br /> Color
          </p>
        </div>
      );
    }
  };
  return <React.Fragment>{buttonText()}</React.Fragment>;
}
