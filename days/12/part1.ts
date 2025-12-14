/**
 * Advent of Code 2025
 *
 * @description
 * Solution for Advent of Code 2025, Day 12, Part 1.
 * Problem details and requirements can be found at: https://adventofcode.com/2025/day/12
 *
 * @note
 * This code was created entirely without any AI usage, outside help or any coding assistant.
 * The solution was developed independently through manual problem analysis, algorithmic thinking,
 * and personal coding skills.
 */

import { input } from "./input";

const rawRegions = input.split("\n\n\n")[1];
let result = 0;

const regions = rawRegions.split("\n").map((region) => {
  const [ratio, places] = region.split(": ");
  const [w, h] = ratio.split("x");

  return {
    size: Number(h) * Number(w),
    sum: places.split(" ").reduce((acc, place) => acc + Number(place), 0),
  };
});

for (let i = 0; i < regions.length; i++) {
  const region = regions[i];
  const shapeNum = region.sum * 7;

  if (region.size >= region.sum * 3 * 3 || region.size >= shapeNum) result++;
}

console.log("result is:", result);
