import React, { useEffect, useState, useRef } from "react";
import LightButton from "./components/LightButton";
import LightModule from "./components/LightModule";
import { colors } from "./colors";
import fetchLight from "./fetchLight";
import getRandomColor from "./getRandomColor";
import "./styles.scss";

export default function App() {
  const [color, setColor] = useState("white");
  const [colorNum, setColorNum] = useState(2);
  const [cycleCount, setCycleCount] = useState(0);
  const [cycleTimingMs, setCycleTimingMs] = useState(500);
  const [init, setInit] = useState(false);
  const [isCycling, setIsCycling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverAwake, setServerAwake] = useState(false);
  const myTimeOut = useRef(null);

  useEffect(() => {
    if (!serverAwake) {
      fetchLight()
        .then(() => setServerAwake(true))
        .catch((err) => console.log("fetchLight err: ", err));
    }
    if (isCycling && cycleCount === 0) {
      cycleLights();
    } else if (isCycling && cycleCount > 0) {
      myTimeOut.current = cycleLightsTimeout();
    }
    return () => clearTimeout(myTimeOut.current);
  });

  const cycleLights = () => {
    let i = colorNum;
    let c = cycleCount;
    setColorNum(i >= colors.length - 1 ? (i = 0) : (i += 1));
    setColor(colors[i]);
    setCycleCount((c += 1));
  };

  const cycleLightsTimeout = () => setTimeout(cycleLights, cycleTimingMs);

  const handleCycleClick = () => {
    clearTimeout(myTimeOut.current);
    if (isCycling) {
      setIsCycling(false);
      setCycleCount(0);
    } else {
      setIsCycling(true);
      setCycleCount(0);
    }
  };

  const handleChangeClick = () => {
    clearTimeout(myTimeOut.current);
    setIsCycling(false);
    setCycleCount(0);
    setColor("white");
    setIsLoading(true);
    handleChangeClick2();
  };

  const handleChangeClick2 = () => {
    fetchLight()
      .then((color) => {
        setColor(color.data.color);
        setColorNum(colors.indexOf(color.data.color));
        setIsLoading(false);
      })
      .catch((err) => console.log("fetchLight error: ", err));
  };

  const handleInitClick = () => {
    if (!init) {
      let newColor = getRandomColor();
      setColorNum(colors.indexOf(newColor));
      setColor(newColor);
      setInit(true);
    }
  };

  return (
    <div className="main">
      <LightModule lightModClick={handleInitClick} color={color} />
      <div className="buttons">
        <LightButton
          onClick={handleChangeClick}
          truthTest={isLoading}
          falseText={"Get Color From API"}
          trueText={"Loading ..."}
        />
        <LightButton
          onClick={handleCycleClick}
          truthTest={isCycling}
          falseText={"Start Light Cycle"}
          trueText={"Stop Light Cycle"}
          trueClassName={"red"}
        />
      </div>
    </div>
  );
}
