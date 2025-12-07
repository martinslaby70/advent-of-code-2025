/**
 * Advent of Code 2025
 *
 * @description 
 * Solution for Advent of Code 2025, Day 2, Part 2.
 * Problem details and requirements can be found at: https://adventofcode.com/2025/day/2
 *
 * @note
 * This code was created entirely without any AI usage, outside help or any coding assistant. 
 * The solution was developed independently through manual problem analysis, algorithmic thinking,
 * and personal coding skills.
 */

import { input } from "./input";

let result = 0;

input.forEach((range) => {
  const [start, end] = range.split("-").map(Number);

  for (let i = start; i <= end; i++) {
    const productId = i.toFixed();

    for (let i = 1; i <= Math.ceil(productId.length / 2); i++) {
      const testedSequence = productId.slice(0, i);
      const numberOfRepeats = productId.length / testedSequence.length;

      if (numberOfRepeats < 2) {
        continue;
      }

      const sequence = testedSequence.repeat(numberOfRepeats);

      if (productId === sequence) {
        console.log("invalid product", productId);
        result += Number(productId);
        break;
      }
    }
  }
});

console.log("result is:", result);