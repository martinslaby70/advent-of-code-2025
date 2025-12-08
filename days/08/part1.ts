/**
 * Advent of Code 2025
 *
 * @description
 * Solution for Advent of Code 2025, Day 8, Part 1.
 * Problem details and requirements can be found at: https://adventofcode.com/2025/day/8
 *
 * @note
 * This code was created entirely without any AI usage, outside help or any coding assistant.
 * The solution was developed independently through manual problem analysis, algorithmic thinking,
 * and personal coding skills.
 */

import { input } from "./input";

type Box = {
  index: number;
  connections: Set<Box>;
  circuit: Set<Box> | undefined;
};

let result = 0;
const limit = 1000;
const distances: { boxA: Box; boxB: Box; distance: number }[] = [];
const boxes = input.split("\n").map((coords) => coords.split(",").map(Number));

for (let i = 0; i < boxes.length; i++) {
  const [x, y, z] = boxes[i];

  for (let j = i + 1; j < boxes.length; j++) {
    const [x1, y1, z1] = boxes[j];
    distances.push({
      boxA: { index: i, circuit: undefined, connections: new Set<Box>() },
      boxB: { index: j, circuit: undefined, connections: new Set<Box>() },
      distance: Math.hypot(x - x1, y - y1, z - z1),
    });
  }
}

distances.sort((pairA, pairB) => pairA.distance - pairB.distance);
distances.splice(limit);

for (let i = 0; i < distances.length; i++) {
  const { boxA, boxB } = distances[i];
  boxA.connections.add(boxB);
  boxB.connections.add(boxA);
}

const recursiveConnections = (box: Box) => {
  const neighbors = Array.from(box.connections);

  for (
    let neighborIndex = 0;
    neighborIndex < neighbors.length;
    neighborIndex++
  ) {
    const neighbor = neighbors[neighborIndex];

    if (!box.circuit?.has(neighbor)) {
      box.circuit!.add(neighbor);
      neighbor.circuit = box.circuit;
      recursiveConnections(neighbor);
    }
  }
};

const circuits: Set<Box>[] = [];

for (let i = 0; i < distances.length; i++) {
  const { boxA, boxB } = distances[i];

  if (!boxA.circuit && !boxB.circuit) {
    const circuit: Set<Box> = new Set([boxA, boxB]);
    circuits.push(circuit);
    boxA.circuit = circuit;
    boxB.circuit = circuit;
    recursiveConnections(boxA);
    recursiveConnections(boxB);
  }
}

result = [...circuits]
  .sort((circuitA, circuitB) => circuitB.size - circuitA.size)
  .slice(0, 3)
  .reduce((product, circuit) => product * circuit.size, 1);

console.log("result is:", result);
