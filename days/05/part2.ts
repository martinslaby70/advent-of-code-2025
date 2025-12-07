/**
 * Advent of Code 2025
 *
 * @description 
 * Solution for Advent of Code 2025, Day 5, Part 2.
 * Problem details and requirements can be found at: https://adventofcode.com/2025/day/5
 *
 * @note
 * This code was created entirely without any AI usage, outside help or any coding assistant. 
 * The solution was developed independently through manual problem analysis, algorithmic thinking,
 * and personal coding skills.
 */

import { input } from "./input";

const [ranges] = input.split("\n\n").map((item) => item.split("\n"));

let sortedRanges = ranges
  .map((range) => range.split("-").map(Number))
  .sort((prev, next) => prev[0] - next[0]);

let i = 0;
while (i < sortedRanges.length) {
  const [from, to] = sortedRanges[i];
  let [prevFrom, prevTo] = sortedRanges[i - 1];

  if (from >= prevFrom && from <= prevTo) {
    prevTo = to < prevTo ? to : prevTo;
    sortedRanges = [...sortedRanges.slice(0, i), ...sortedRanges.slice(i + 1)];
  } else {
    i++;
  }
}

const result = sortedRanges.reduce(
  (acc, range) => acc + range[1] - range[0] + 1,
  0
);

console.log("result is:", result);