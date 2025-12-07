/**
 * Advent of Code 2025
 *
 * @description 
 * Solution for Advent of Code 2025, Day 4, Part 2.
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

const removedRolls = new Set<string>([]);

let didRemoveSomethingThisCycle = true;
while (didRemoveSomethingThisCycle) {
  didRemoveSomethingThisCycle = false;

  const removedThisCycle = new Set<string>([]);

  for (let i = 0; i < data.length; i++) {
    const row = data[i];

    for (let j = 0; j < row.length; j++) {
      let numOfAdjacentRolls = 0;
      const char = row[j];

      if (char === "." || removedRolls.has(`${i},${j}`)) continue;

      adjacentLocations.forEach(([offsetX, offsetY]) => {
        const x = i + offsetX;
        const y = j + offsetY;

        if (data[x]?.[y] === "@" && !removedRolls.has(`${x},${y}`)) {
          numOfAdjacentRolls++;
        }
      });

      if (numOfAdjacentRolls < 4) {
        didRemoveSomethingThisCycle = true;
        result++;
        removedThisCycle.add(`${i},${j}`);
      }
    }
  }

  removedThisCycle.forEach((val) => removedRolls.add(val));
}

console.log("result is:", result);