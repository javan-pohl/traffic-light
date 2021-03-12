import React, { useEffect, useState } from "react";
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
  const [inApiMode, setInApiMode] = useState(true);
  const [init, setInit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverAwake, setServerAwake] = useState(false);

  useEffect(() => {
    if (!serverAwake) {
      fetchLight()
        .then(() => setServerAwake(true))
        .catch((err) => console.log("fetchLight err: ", err));
    }
  });

  const handleApiClick = () => {
    setColor("white");
    setIsLoading(true);
    handleApiClick2();
  };

  const handleApiClick2 = () => {
    fetchLight()
      .then((color) => {
        setColor(color.data.color);
        setColorNum(colors.indexOf(color.data.color));
        setIsLoading(false);
      })
      .catch((err) => console.log("fetchLight error: ", err));
  };

  const handleCycleClick = () => {
    let c = cycleCount;
    let i = c === 0 ? (color === "green" ? 1 : 2) : colorNum;
    setColor(colors[i]);
    setColorNum(i <= 0 ? (i = colors.length - 1) : (i -= 1));
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
    setCycleCount(0);
  };

  const renderButton = () => {
    if (inApiMode) {
      return (
        <LightButton
          onClick={handleApiClick}
          truthTest={isLoading}
          trueText={"Loading..."}
          falseText={"Get API Color"}
          trueClassName={"red"}
        />
      );
    } else {
      return (
        <LightButton
          onClick={handleCycleClick}
          truthTest={true}
          trueText={"Click to Cycle Colors"}
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
