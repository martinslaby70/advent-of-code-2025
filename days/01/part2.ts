/**
 * Advent of Code 2025
 *
 * @description 
 * Solution for Advent of Code 2025, Day 1, Part 2.
 * Problem details and requirements can be found at: https://adventofcode.com/2025/day/1
 *
 * @note
 * This code was created entirely without any AI usage, outside help or any coding assistant. 
 * The solution was developed independently through manual problem analysis, algorithmic thinking,
 * and personal coding skills.
 */

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