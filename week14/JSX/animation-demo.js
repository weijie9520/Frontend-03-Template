import { Timeline, Animation } from "./animation.js";
import { ease } from "./ease.js";

const timeline = new Timeline();

let animation = new Animation(
  document.querySelector("#test").style,
  "transform",
  0,
  500,
  2000,
  1000,
  ease,
  (v) => `translateX(${v}px)`
);

timeline.add(animation);
timeline.start();

// document.querySelector("#el2").style.transition = "transform 2s ease 1s";
// document.querySelector("#el2").style.transform = "translateX(500px)";

document.querySelector("#pause-btn").addEventListener("click", () => {
  timeline.pause();
});

document.querySelector("#resume-btn").addEventListener("click", () => {
  timeline.resume();
});

document.querySelector("#reset-btn").addEventListener("click", () => {
  timeline.reset();
  timeline.add(animation);
});
