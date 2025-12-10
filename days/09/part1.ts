/**
 * Advent of Code 2025
 *
 * @description
 * Solution for Advent of Code 2025, Day 9, Part 1.
 * Problem details and requirements can be found at: https://adventofcode.com/2025/day/8
 *
 * @note
 * This code was created entirely without any AI usage, outside help or any coding assistant.
 * The solution was developed independently through manual problem analysis, algorithmic thinking,
 * and personal coding skills.
 */

import { input } from "./input";

const points = input.split("\n");

let result = 0;

for (let i = 0; i < points.length; i++) {
  const [x, y] = points[i].split(",").map(Number);

  for (let j = i; j < points.length; j++) {
    const [x1, y1] = points[j].split(",").map(Number);

    const lengthA = Math.abs(y1 - y) + 1;
    const lengthB = Math.abs(x1 - x) + 1;

    const area = lengthA * lengthB;

    if (area > result) {
      result = area;
    }
  }
}

console.log("result is:", result);
