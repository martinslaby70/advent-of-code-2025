/**
 * Advent of Code 2025
 *
 * @description
 * Solution for Advent of Code 2025, Day 11, Part 2.
 * Problem details and requirements can be found at: https://adventofcode.com/2025/day/11
 *
 * @note
 * This code was created entirely without any AI usage, outside help or any coding assistant.
 * The solution was developed independently through manual problem analysis, algorithmic thinking,
 * and personal coding skills.
 */

import { input } from "./input";

const connections = new Map<string, string[]>(
  input.split("\n").map((device) => {
    const [deviceName, deviceConnections] = device.split(":");
    return [deviceName, deviceConnections.trim().split(" ")] as const;
  })
);

const checked = new Map<string, number>();

const findOut = (deviceName: string, history: string[]): number => {
  const hasDac = history.includes("dac");
  const hasFft = history.includes("fft");
  const cacheKey = `${deviceName}_${hasDac}_${hasFft}`;
  const deviceConnections = connections.get(deviceName) ?? [];
  let count = 0;

  const foundResult = checked.get(cacheKey);
  if (foundResult) return foundResult;

  if (deviceName === "out" && hasDac && hasFft) return 1;

  for (const connection of deviceConnections)
    count += findOut(connection, [...history, deviceName]);

  checked.set(cacheKey, count);
  return count;
};

let result = findOut("svr", []);
console.log("result is:", result);
