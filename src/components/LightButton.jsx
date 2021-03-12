import React from "react";

export default function LightButton({
  onClick,
  truthTest,
  falseText,
  trueText,
  falseClassName = { falseClassName: "light-green" },
  trueClassName = { trueClassName: "" }
}) {
  const buttonText = () => {
    const trueCss = "change-button " + trueClassName;
    const falseCss = "change-button " + falseClassName;
    if (truthTest) {
      return (
        <div className={trueCss} onClick={() => onClick()}>
          {trueText}
        </div>
      );
    } else {
      return (
        <div className={falseCss} onClick={() => onClick()}>
          {falseText}
        </div>
      );
    }
  };
  return <React.Fragment>{buttonText()}</React.Fragment>;
}
