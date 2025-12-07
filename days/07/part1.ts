/**
 * Advent of Code 2025
 *
 * @description 
 * Solution for Advent of Code 2025, Day 7, Part 1.
 * Problem details and requirements can be found at: https://adventofcode.com/2025/day/7
 *
 * @note
 * This code was created entirely without any AI usage, outside help or any coding assistant. 
 * The solution was developed independently through manual problem analysis, algorithmic thinking,
 * and personal coding skills.
 */

import { input } from "./input";

let result = 0;
const rows = input.split("\n").map((row) => row.split(""));

let beamsIndexes = new Set<number>([rows[0].indexOf("S")]);

for (let i = 1; i < rows.length; i++) {
  const row = rows[i];

  for (let j = 0; j < row.length; j++) {
    const isSplitter = row[j] === "^";

    if (isSplitter && beamsIndexes.has(j)) {
      result++;

      beamsIndexes.delete(j);
      beamsIndexes.add(j - 1);
      beamsIndexes.add(j + 1);
    }
  }
}

console.log("result is:", result);