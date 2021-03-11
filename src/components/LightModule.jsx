import React, { useState } from "react";

export default function LightModule() {
  return (
    <div className="light-module">
      <div className="light-module-square">
        <div className="light red"></div>
      </div>
      <div className="light-module-square">
        <div className="light yellow"></div>
      </div>
      <div className="light-module-square">
        <div className="light green"></div>
      </div>
    </div>
  );
}
