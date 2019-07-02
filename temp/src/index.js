import React from "react";
import { render } from "react-dom";
import App from "./App";
console.log("1");
let a = new Set([1, 2, 3, 4]);

console.log(...a);
let obj = {
  name: "ys"
};
let promise = new Promise((resolve, reject) => {
  return resolve();
});
console.log(promise);
console.log(Object.assign(obj, { age: 24 }));
class S {}
import "./css/index.less";
"foorbor".includes("foo");
render(<App />, document.getElementById("root"));
module.hot && module.hot.accept();
