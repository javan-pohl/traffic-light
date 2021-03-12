import React, { useState } from "react";
import ChangeButton from "./components/ChangeButton";
import LightModule from "./components/LightModule";
import getRandomColor from "./getRandomColor";
import "./styles.scss";

export default function App() {
  const [color, setColor] = useState("white");
  const [init, setInit] = useState(false);

  async function handleChangeColor() {
    setColor(color);
  }
  const handleInitClick = () => {
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
        <ChangeButton getColor={handleChangeColor} />
      </div>
    </div>
  );
}
