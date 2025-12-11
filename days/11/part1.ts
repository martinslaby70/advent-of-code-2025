/**
 * Advent of Code 2025
 *
 * @description
 * Solution for Advent of Code 2025, Day 11, Part 1.
 * Problem details and requirements can be found at: https://adventofcode.com/2025/day/11
 *
 * @note
 * This code was created entirely without any AI usage, outside help or any coding assistant.
 * The solution was developed independently through manual problem analysis, algorithmic thinking,
 * and personal coding skills.
 */

import { input } from "./input";
let result = 0;

const connections = new Map<string, string[]>(
  input.split("\n").map((device) => {
    const [deviceName, deviceConnections] = device.split(":");
    return [deviceName, deviceConnections.trim().split(" ")] as const;
  })
);

const findOut = (deviceName: string) => {
  const deviceConnections = connections.get(deviceName) ?? [];

  if (deviceConnections[0] === "out") {
    result++;
    return;
  }

  deviceConnections.forEach(findOut);
};

findOut("you");
console.log("result is:", result);
