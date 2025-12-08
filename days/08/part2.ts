/**
 * Advent of Code 2025
 *
 * @description
 * Solution for Advent of Code 2025, Day 8, Part 2.
 * Problem details and requirements can be found at: https://adventofcode.com/2025/day/8
 *
 * @note
 * This code was created entirely without any AI usage, outside help or any coding assistant.
 * The solution was developed independently through manual problem analysis, algorithmic thinking,
 * and personal coding skills.
 */

import { input } from "./input";

type Box = {
  x: number;
  y: number;
  z: number;
  connections: Set<Box>;
  circuit: Set<Box> | undefined;
};

let result = 0;
const distances: { boxA: Box; boxB: Box; distance: number }[] = [];

const boxes = input.split("\n").map((coords) => {
  const [x, y, z] = coords.split(",").map(Number);
  return { x, y, z, connections: new Set() } as Box;
});

for (let i = 0; i < boxes.length; i++) {
  const boxA = boxes[i];
  for (let j = i + 1; j < boxes.length; j++) {
    const boxB = boxes[j];
    distances.push({
      boxA,
      boxB,
      distance: Math.hypot(boxA.x - boxB.x, boxA.y - boxB.y, boxA.z - boxB.z),
    });
  }
}

distances.sort((a, b) => a.distance - b.distance);

for (let i = 0; i < distances.length; i++) {
  const { boxA, boxB } = distances[i];
  boxA.connections.add(boxB);
  boxB.connections.add(boxA);

  const circuit: Set<Box> = new Set();

  const notChecked = [boxB, boxA];
  while (notChecked.length > 0) {
    const box = notChecked.pop() as Box;

    if (!circuit.has(box)) {
      circuit.add(box);
      const neighbors = Array.from(box.connections);
      for (let j = 0; j < neighbors.length; j++) {
        notChecked.push(neighbors[j]);
      }
    }
  }

  if (circuit.size === boxes.length) {
    result = boxA.x * boxB.x;
    break;
  }
}

console.log("result is:", result);
