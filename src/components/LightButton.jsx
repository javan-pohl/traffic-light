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
    const trueCss = "button " + trueClassName;
    const falseCss = "button " + falseClassName;
    return (
      <div className={truthTest ? trueCss : falseCss} onClick={() => onClick()}>
        {truthTest ? trueText : falseText}
      </div>
    );
  };
  return <React.Fragment>{buttonText()}</React.Fragment>;
}
