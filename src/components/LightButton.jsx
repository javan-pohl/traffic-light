import React from "react";

export default function LightButton({
  onClick,
  truthTest,
  falseText,
  trueText
}) {
  const buttonText = () => {
    if (truthTest) {
      return (
        <div
          className="change-button pulsing-continous"
          onClick={() => onClick()}
        >
          {trueText}
        </div>
      );
    } else {
      return (
        <div className="change-button" onClick={() => onClick()}>
          {falseText}
        </div>
      );
    }
  };
  return <React.Fragment>{buttonText()}</React.Fragment>;
}
