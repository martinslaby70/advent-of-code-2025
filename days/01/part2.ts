import { input } from "./input";

let dialRotation = 50;
let result = 0;

input.forEach((value) => {
  const direction = value.charAt(0) as "L" | "R";
  const distance = Number(value.slice(1).slice(-2));
  const numberOfRotations = Number(value.slice(1, value.length - 2) || "0");

  if (direction === "R") {
    const isOverflowing = dialRotation + distance >= 100;
    const newRotation = dialRotation + distance - (isOverflowing ? 100 : 0);
    const didPointToZero = isOverflowing && dialRotation !== 0;

    const numOfClicks = (isOverflowing ? 1 : 0) + numberOfRotations;

    dialRotation = newRotation;
    result += numOfClicks;
  }

  if (direction === "L") {
    const isOverflowing = dialRotation - distance < 0;
    const newRotation = dialRotation - distance + (isOverflowing ? 100 : 0);
    const didPointToZero =
      (isOverflowing && dialRotation !== 0) || newRotation === 0;

    const numOfClicks = (didPointToZero ? 1 : 0) + numberOfRotations;

    dialRotation = newRotation;
    result += numOfClicks;
  }
});

console.log("result is:", result);
