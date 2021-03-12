import React, { useState } from "react";

export default function LightModule({ color, lightModClick }) {
  const isRed = () =>
    color === "red" ? "light red pulse-red pulse" : "light white";
  const isYellow = () =>
    color === "yellow" ? "light yellow pulse-yellow pulse" : "light white";
  const isGreen = () =>
    color === "green" ? "light green pulse-green pulse" : "light white";

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
