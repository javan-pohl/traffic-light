import React from "react";

export default function ChangeButton({ getColor }) {
  return (
    <div className="change-button" onClick={() => getColor()}>
      Get <br /> Random <br /> Color
    </div>
  );
}
