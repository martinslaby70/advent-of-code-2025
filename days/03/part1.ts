/**
 * Advent of Code 2025
 *
 * @description 
 * Solution for Advent of Code 2025, Day 3, Part 1.
 * Problem details and requirements can be found at: https://adventofcode.com/2025/day/3
 *
 * @note
 * This code was created entirely without any AI usage, outside help or any coding assistant. 
 * The solution was developed independently through manual problem analysis, algorithmic thinking,
 * and personal coding skills.
 */

import { input } from "./input";

const lines = input.split("\n");

let result = 0;

lines.forEach((line) => {
  let largest = 0;
  let secondLargest = 0;

  for (let i = 0; i < line.length; i++) {
    const voltage = Number(line[i]);

    if (voltage > largest && i !== line.length - 1) {
      largest = voltage;
      secondLargest = 0;
      continue;
    }

    if (voltage > secondLargest) {
      secondLargest = voltage;
    }
  }

  result += Number(`${largest}${secondLargest}`);
});

console.log("result is:", result);