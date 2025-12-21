/**
 * Advent of Code 2025
 *
 * @description
 * Solution for Advent of Code 2025, Day 10, Part 2.
 * Problem details and requirements can be found at: https://adventofcode.com/2025/day/10
 *
 * @note
 * This code was created entirely without any AI usage, outside help or any coding assistant.
 * The solution was developed independently through manual problem analysis, algorithmic thinking,
 * and personal coding skills.
 */

import { input } from "./input";

let result = 0;

const machines = input.split("\n").map((item) => {
  const lineData = item.split(" ");
  lineData.shift();

  const joltageData = lineData.pop()!;
  const joltages = joltageData.slice(1, -1).split(",").map(Number);

  const buttons = lineData.map((item) =>
    item.slice(1, -1).split(",").map(Number)
  );

  return { buttons, joltages };
});

const gcd = (a: number, b: number): number => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
};

const lcm = (a: number, b: number): number => {
  return Math.abs(a * b) / gcd(a, b);
};

const scaleRow = (row: number[], scalar: number): void => {
  for (let i = 0; i < row.length; i++) row[i] *= scalar;
};

const reduceRow = (
  rowToReduce: number[],
  reducingRow: number[],
  column: number
): number[] => {
  if (rowToReduce[column] === 0) return rowToReduce;

  const result = [...rowToReduce];
  const reducing = [...reducingRow];

  if (result[column] < 0) scaleRow(result, -1);

  const scaleTo = lcm(result[column], reducing[column]);
  scaleRow(result, scaleTo / result[column]);
  scaleRow(reducing, scaleTo / reducing[column]);

  for (let i = 0; i < result.length; i++) result[i] -= reducing[i];

  return result;
};

const reduceMatrix = (matrix: number[][]): void => {
  const diagonalEnd = Math.min(matrix.length, matrix[0].length - 1);

  for (let d = 0; d < diagonalEnd; d++) {
    let foundRow = -1;
    for (let row = d; row < matrix.length; row++) {
      if (matrix[row][d] !== 0) {
        foundRow = row;
        break;
      }
    }

    if (foundRow === -1) continue;

    if (foundRow !== d)
      [matrix[d], matrix[foundRow]] = [matrix[foundRow], matrix[d]];

    if (matrix[d][d] < 0) scaleRow(matrix[d], -1);

    for (let row = d + 1; row < matrix.length; row++) {
      matrix[row] = reduceRow(matrix[row], matrix[d], d);
    }
  }
};

const solveMatrix = (
  buttons: number[][],
  targets: number[],
  matrix: number[][],
  rowToSolve: number,
  nextUnknown: number,
  constraints: number[],
  solution: number[],
  bestSolution: { value: number }
) => {
  const m = buttons.length;

  if (rowToSolve === -1) {
    const verify = Array(targets.length).fill(0);
    for (let btn = 0; btn < m; btn++) {
      for (const counter of buttons[btn]) verify[counter] += solution[btn];
    }

    if (verify.every((val, idx) => val === targets[idx])) {
      const total = solution.reduce((acc, val) => acc + val, 0);
      bestSolution.value = Math.min(bestSolution.value, total);
    }
    return;
  }

  if (nextUnknown > rowToSolve || matrix[rowToSolve][nextUnknown] === 0) {
    for (let guess = 0; guess <= constraints[nextUnknown]; guess++) {
      solution[nextUnknown] = guess;
      const nextRow = nextUnknown > rowToSolve ? rowToSolve : rowToSolve - 1;
      solveMatrix(
        buttons,
        targets,
        matrix,
        nextRow,
        nextUnknown - 1,
        constraints,
        solution,
        bestSolution
      );
    }
    return;
  }

  let rowSum = matrix[rowToSolve][m];
  for (let col = nextUnknown + 1; col < m; col++) {
    rowSum -= matrix[rowToSolve][col] * solution[col];
  }

  const leading = matrix[rowToSolve][nextUnknown];
  if (rowSum % leading !== 0 || rowSum / leading < 0) return;

  solution[nextUnknown] = rowSum / leading;
  solveMatrix(
    buttons,
    targets,
    matrix,
    rowToSolve - 1,
    nextUnknown - 1,
    constraints,
    solution,
    bestSolution
  );
};

const solveMachine = (buttons: number[][], targets: number[]): number => {
  const matrix = targets.map((target, i) => [
    ...buttons.map((btn) => (btn.includes(i) ? 1 : 0)),
    target,
  ]);

  reduceMatrix(matrix);

  const constraints = buttons.map((btn) =>
    Math.min(...btn.map((counter) => targets[counter]))
  );

  const bestSolution = { value: Infinity };
  solveMatrix(
    buttons,
    targets,
    matrix,
    Math.min(targets.length, buttons.length) - 1,
    buttons.length - 1,
    constraints,
    Array(buttons.length).fill(0),
    bestSolution
  );

  return bestSolution.value;
};

machines.forEach((machine) => {
  const minPresses = solveMachine(machine.buttons, machine.joltages);
  result += minPresses;
});

console.log(result);
