/**
 * Advent of Code 2025
 *
 * @description 
 * Solution for Advent of Code 2025, Day 4, Part 1.
 * Problem details and requirements can be found at: https://adventofcode.com/2025/day/4
 *
 * @note
 * This code was created entirely without any AI usage, outside help or any coding assistant. 
 * The solution was developed independently through manual problem analysis, algorithmic thinking,
 * and personal coding skills.
 */

import { input } from "./input";

const data = input.split("\n");
let result = 0;

const adjacentLocations: [number, number][] = [
  [1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, 1],
  [0, -1],
];

for (let i = 0; i < data.length; i++) {
  const row = data[i];

  for (let j = 0; j < row.length; j++) {
    let numOfAdjacentRolls = 0;
    const char = row[j];

    if (char === ".") continue;

    adjacentLocations.forEach(([offsetX, offsetY]) => {
      if (data[i + offsetX]?.[j + offsetY] === "@") numOfAdjacentRolls++;
    });

    if (numOfAdjacentRolls < 4) result++;
  }
}

console.log("result is:", result);