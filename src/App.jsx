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
  const [cycleTimingMs, setCycleTimingMs] = useState(50);
  const [inApiMode, setInApiMode] = useState(true);
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
      handleCycleClick();
    } else if (isCycling && cycleCount > 0) {
      myTimeOut.current = autoCycle();
    }
    return () => clearTimeout(myTimeOut.current);
  });

  const autoCycle = () => setTimeout(handleCycleClick, cycleTimingMs);

  const handleChangeClick = () => {
    setIsCycling(true);
    setColor("white");
    setIsLoading(true);
    handleChangeClick2();
  };

  const handleChangeClick2 = () => {
    fetchLight()
      .then((color) => {
        setColor(color.data.color);
        setColorNum(colors.indexOf(color.data.color));
        setIsCycling(false);
        setIsLoading(false);
      })
      .catch((err) => console.log("fetchLight error: ", err));
  };

  const handleCycleClick = () => {
    let c = cycleCount;
    let i = c === 0 ? (color === "green" ? 1 : 2) : colorNum;
    setColorNum(i <= 0 ? (i = colors.length - 1) : (i -= 1));
    setColor(colors[i]);
    setCycleCount((c += 1));
  };

  const handleInitClick = () => {
    if (!init) {
      let newColor = getRandomColor();
      setColorNum(colors.indexOf(newColor));
      setColor(newColor);
      setInit(true);
    }
  };

  const handleModeClick = () => {
    setInApiMode(!inApiMode);
  };

  const renderButton = () => {
    if (inApiMode) {
      return (
        <LightButton
          onClick={handleChangeClick}
          truthTest={isLoading}
          trueText={"Loading..."}
          falseText={"Change!"}
          trueClassName={"red"}
        />
      );
    } else {
      return (
        <LightButton
          onClick={handleCycleClick}
          truthTest={true}
          trueText={"Cycle Through Colors"}
          trueClassName={"red"}
        />
      );
    }
  };

  return (
    <div className="main">
      <LightModule lightModClick={handleInitClick} color={color} />
      <div className="buttons">
        <LightButton
          onClick={handleModeClick}
          truthTest={inApiMode}
          falseText={"Switch to API Mode"}
          trueText={"Switch to Manual Mode"}
        />
        {renderButton()}
      </div>
    </div>
  );
}
