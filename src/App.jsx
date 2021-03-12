import React, { useState } from "react";
import ChangeButton from "./components/ChangeButton";
import LightModule from "./components/LightModule";
import fetchLight from "./fetchLight";
import getRandomColor from "./getRandomColor";
import "./styles.scss";

export default function App() {
  const [color, setColor] = useState("white");
  const [init, setInit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        <ChangeButton getColor={handleChangeColor} isLoading={isLoading} />
      </div>
    </div>
  );
}
