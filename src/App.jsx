import React, { useState } from "react";
import LightButton from "./components/LightButton";
import LightModule from "./components/LightModule";
import { colors } from "./colors";
import fetchLight from "./fetchLight";
import getRandomColor from "./getRandomColor";
import "./styles.scss";

export default function App() {
  const [color, setColor] = useState("white");
  const [cycleTimingMs, setCycleTimingMs] = useState(500);
  const [init, setInit] = useState(false);
  const [isCycling, setIsCycling] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  async function cycleLights() {
    console.log("isCycling: ", isCycling);
    let i = 0;
    while (isCycling) {
      if (i >= color.length) {
        i = 0;
      }
      setColor(colors[i]);
      await setTimeout(cycleTimingMs);
      i += 1;
    }
  }
  const handleCycleClick = () => {
    if (isCycling) {
      setIsCycling(false);
    } else {
      setIsCycling(true);
      cycleLights();
    }
  };

  const handleChangeColor = () => {
    setColor("white");
    setIsLoading(true);
    handleChangeColor2();
  };

  const handleChangeColor2 = () => {
    fetchLight()
      .then((color) => {
        setColor(color.data.color);
        setIsLoading(false);
      })
      .catch((err) => console.log("fetchLight error: ", err));
  };
  const handleInitClick = () => {
    fetchLight(); //to wake-up the server
    if (!init) {
      let newColor = getRandomColor();
      setColor(newColor);
      setInit(true);
    }
  };

  return (
    <div className="main">
      <LightModule lightModClick={handleInitClick} color={color} />
      <div className="buttons">
        <LightButton
          onClick={handleChangeColor}
          truthTest={isLoading}
          falseText={"Get Random Color"}
          trueText={"Loading ..."}
        />
        <LightButton
          onClick={handleCycleClick}
          truthTest={isCycling}
          falseText={"Start Light Cycle"}
          trueText={"Stop Light Cycle"}
        />
      </div>
    </div>
  );
}
