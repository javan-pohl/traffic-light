import React from "react";

export default function LightButton({
  active,
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
      <button
        disabled={!active}
        className={truthTest ? trueCss : falseCss}
        onClick={active ? () => onClick() : null}
      >
        {truthTest ? trueText : falseText}
      </button>
    );
  };
  return <React.Fragment>{buttonText()}</React.Fragment>;
}
