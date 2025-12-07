/**
 * Advent of Code 2025
 *
 * @description 
 * Solution for Advent of Code 2025, Day 6, Part 1.
 * Problem details and requirements can be found at: https://adventofcode.com/2025/day/6
 *
 * @note
 * This code was created entirely without any AI usage, outside help or any coding assistant. 
 * The solution was developed independently through manual problem analysis, algorithmic thinking,
 * and personal coding skills.
 */

import { input } from "./input";

let result = 0;
const rows = input.split("\n").map((row) => row.trim().split(/\s+/));

const solveOperation = (values: string[], operation: string) =>
  values.reduce((acc, curr, next) => {
    const num = Number(curr);

    if (acc === 0) return num;

    if (operation === "+") return acc + num;
    if (operation === "*") return acc * num;

    return num;
  }, 0);

for (let i = 0; i < rows[0].length; i++) {
  const operation = rows[rows.length - 1][i];
  const numbers: string[] = [];

  for (let j = 0; j < rows.length - 1; j++) {
    numbers.push(rows[j][i]);
  }

  result += solveOperation(numbers, operation);
}

console.log("result is:", result);