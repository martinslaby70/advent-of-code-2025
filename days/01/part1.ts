import { input } from "./input";

let dialRotation = 50;
let result = 0;

input.forEach((value) => {
  const direction = value.charAt(0) as "L" | "R";
  const distance = Number(value.slice(1).slice(-2));

  if (direction === "R") {
    const isOverflowing = dialRotation + distance >= 100;
    dialRotation = dialRotation + distance - (isOverflowing ? 100 : 0);
  }

  if (direction === "L") {
    const isOverflowing = dialRotation - distance < 0;
    dialRotation = dialRotation - distance + (isOverflowing ? 100 : 0);
  }

  if (dialRotation === 0) result++;
});

console.log("result is:", result);
