import React from "react";

export default function LightModule({ color, lightModClick }) {
  const isRed = () => (color === "red" ? "light red" : "light white");
  const isYellow = () => (color === "yellow" ? "light yellow" : "light white");
  const isGreen = () => (color === "green" ? "light green" : "light white");

  return (
    <div className="light-module" onClick={() => lightModClick()}>
      <div className="light-module-square">
        <div className={isRed()}></div>
      </div>
      <div className="light-module-square">
        <div className={isYellow()}></div>
      </div>
      <div className="light-module-square">
        <div className={isGreen()}></div>
      </div>
    </div>
  );
}
