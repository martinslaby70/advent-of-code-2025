/**
 * Advent of Code 2025
 *
 * @description
 * Solution for Advent of Code 2025, Day 9, Part 2.
 * Problem details and requirements can be found at: https://adventofcode.com/2025/day/9
 *
 * @note
 * This code was created entirely without any AI usage, outside help or any coding assistant.
 * The solution was developed independently through manual problem analysis, algorithmic thinking,
 * and personal coding skills.
 */

import { input } from "./input";

const points = input.split("\n").map((p) => p.split(",").map(Number));
let result = 0;

function getRect(corner0: number[], corner1: number[]) {
  let [x, y] = corner0;
  let [x1, y1] = corner1;

  if (x1 < x) return { left: x1, right: x, top: y, bottom: y1 };
  if (y1 < y) return { left: x, right: x1, top: y1, bottom: y };
  return { left: x, right: x1, top: y, bottom: y1 };
}

function checkCollisions(
  corner0: number[],
  corner1: number[],
  idx0: number,
  idx1: number
) {
  const rect0 = getRect(corner0, corner1);

  for (let i = 0; i < points.length; i++) {
    let n = i + 1;
    if (n >= points.length) {
      n = 0;
    }

    if (i === idx0 || i === idx1 || n === idx0 || n === idx1) {
      continue;
    }

    const rect1 = getRect(points[i], points[n]);

    if (
      rect0.left < rect1.right &&
      rect0.right > rect1.left &&
      rect0.top < rect1.bottom &&
      rect0.bottom > rect1.top
    ) {
      return false;
    }
  }

  return true;
}

for (let i = 0; i < points.length - 1; i++) {
  const corner0 = points[i];

  for (let n = i + 1; n < points.length; n++) {
    const corner1 = points[n];
    const possible = checkCollisions(corner0, corner1, i, n);

    if (!possible) continue;

    const lengthA = Math.abs(corner0[0] - corner1[0]) + 1;
    const lengthB = Math.abs(corner0[1] - corner1[1]) + 1;

    const area = lengthA * lengthB;

    if (area > result) {
      result = area;
    }
  }
}

console.log("result is:", result);
