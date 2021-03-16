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
  const [cycleTimingMs] = useState(50);
  const [inApiMode, setInApiMode] = useState(true);
  const [init, setInit] = useState(false);
  const [isAutoCycling, setisAutoCycling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverAwake, setServerAwake] = useState(false);
  const myTimeOut = useRef(null);

  useEffect(() => {
    if (!serverAwake) {
      fetchLight()
        .then(() => setServerAwake(true))
        .catch((err) => console.log("fetchLight err: ", err));
    }
    if (isAutoCycling && cycleCount === 0) {
      handleCycleClick();
    } else if (isAutoCycling && cycleCount > 0) {
      myTimeOut.current = autoCycle();
    }
    return () => clearTimeout(myTimeOut.current);
  });

  const autoCycle = () => setTimeout(handleCycleClick, cycleTimingMs);

  const handleChangeClick = () => {
    setisAutoCycling(true);
    setColor("white");
    setIsLoading(true);
    handleChangeClick2();
  };

  const handleChangeClick2 = () => {
    fetchLight()
      .then((color) => {
        setColor(color);
        setColorNum(colors.indexOf(color));
        setisAutoCycling(false);
        setIsLoading(false);
      })
      .catch((err) => console.log("fetchLight error: ", err));
  };

  const handleCycleClick = () => {
    let c = cycleCount;
    let i = c === 0 ? (color === "green" ? 2 : 3) : colorNum;
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
    setisAutoCycling(false);
    setIsLoading(false);
    setInApiMode(!inApiMode);
  };

  const renderButtons = () => {
    if (init) {
      return (
        <React.Fragment>
          <LightButton
            active={init}
            onClick={handleModeClick}
            truthTest={inApiMode}
            falseText={"Switch to API Mode"}
            trueText={"Switch to Manual Mode"}
          />
          <LightButton
            active={init}
            onClick={inApiMode ? handleChangeClick : handleCycleClick}
            truthTest={inApiMode ? isLoading : true}
            trueText={inApiMode ? "Loading..." : "Cycle Through Colors"}
            falseText={inApiMode ? "Change!" : ""}
            trueClassName={"red"}
          />
        </React.Fragment>
      );
    } else {
      return (
        <LightButton
          active={init}
          falseText={"Click on Stoplight to Initiate"}
          falseClassName={"yellow black-text no-hover"}
        />
      );
    }
  };

  return (
    <div className="main">
      <LightModule lightModClick={handleInitClick} color={color} />
      <div className="buttons">{renderButtons()}</div>
    </div>
  );
}
