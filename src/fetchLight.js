import axios from "axios";

export default function fetchLight() {
  return new Promise((resolve, reject) => {
    axios
      .get("https://traffic-light-api.herokuapp.com/")
      .then((data) => {
        resolve(data.data.color);
      })
      .catch((err) => {
        console.log("get error");
        reject(err);
      });
  });
}
