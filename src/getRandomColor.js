import { colors } from "./colors";

export default function getRandomColor() {
  return colors[Math.floor(Math.random() * 3)];
}
