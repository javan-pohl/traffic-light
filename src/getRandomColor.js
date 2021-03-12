export default function getRandomColor() {
  let colors = ["red", "yellow", "green"];
  return colors[Math.floor(Math.random() * 3)];
}
