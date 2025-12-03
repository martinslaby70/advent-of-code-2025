import { input } from "./input";

const lines = input.split("\n");

const largestInLines = lines.map((line) => {
  let largest = 0;
  let secondLargest = 0;

  for (let i = 0; i < line.length; i++) {
    const voltage = Number(line[i]);

    if (voltage > largest && i !== line.length - 1) {
      largest = voltage;
      secondLargest = 0;
      continue;
    }

    if (voltage > secondLargest) {
      secondLargest = voltage;
    }
  }

  return Number(`${largest}${secondLargest}`);
});

const result = largestInLines.reduce((prev, curr) => prev + curr);

console.log("result is:", result);
