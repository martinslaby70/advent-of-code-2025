/**
 * Advent of Code 2025
 *
 * @description
 * Solution for Advent of Code 2025, Day 10, Part 1.
 * Problem details and requirements can be found at: https://adventofcode.com/2025/day/12
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
  lineData.pop();

  const [diagramData, ...buttonsData] = lineData;

  const diagram = diagramData
    .slice(1, -1)
    .split("")
    .map((item) => (item === "." ? 0 : 1));

  const buttons = buttonsData.map((item) =>
    item.slice(1, -1).split(",").map(Number)
  );

  return { diagram, buttons };
});

let getCombinations = function (list: number[][], numItems: number) {
  if (list.length < numItems) {
    return [];
  }

  if (numItems == 1) {
    let result: number[][][] = [];
    for (let i = 0; i < list.length; i++) {
      result.push([list[i]]);
    }
    return result;
  }

  let result: number[][][] = [];
  for (let i = 0; i < list.length; i++) {
    let currentElement = list.slice(i, i + 1);
    let restList = list.slice(0, i).concat(list.slice(i + 1));
    let restCombinations = getCombinations(restList, numItems - 1);
    for (let j = 0; j < restCombinations.length; j++) {
      result.push(currentElement.concat(restCombinations[j]));
    }
  }
  return result;
};

machines.forEach((machine, ii) => {
  for (let i = 1; i < machine.buttons.length; i++) {
    const pressedButtons = getCombinations(machine.buttons, i);

    console.log(ii, i);

    const isSomeMatching = pressedButtons.some((combination) => {
      const state: number[] = Array(machine.diagram.length).fill(0);
      combination.flat().forEach((num) => {
        if (num <= state.length) {
          const val = state[num];
          state[num] = val === 1 ? 0 : 1;
        }
      });

      return state.join("") === machine.diagram.join("");
    });

    if (isSomeMatching) {
      result += i;
      break;
    }
  }
});

console.log(result);
