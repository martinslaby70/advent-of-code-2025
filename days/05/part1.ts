/**
 * Advent of Code 2025
 *
 * @description 
 * Solution for Advent of Code 2025, Day 5, Part 1.
 * Problem details and requirements can be found at: https://adventofcode.com/2025/day/5
 *
 * @note
 * This code was created entirely without any AI usage, outside help or any coding assistant. 
 * The solution was developed independently through manual problem analysis, algorithmic thinking,
 * and personal coding skills.
 */

import { input } from "./input";

const [ranges, ids] = input.split("\n\n").map((item) => item.split("\n"));
let result = 0;

ids.forEach((stringId) => {
  const id = Number(stringId);

  for (let i = 0; i < ranges.length; i++) {
    const [from, to] = ranges[i].split("-").map(Number);

    if (id >= from && id <= to) {
      result++;
      break;
    }
  }
});

console.log("result is:", result);