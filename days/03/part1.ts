import { input } from "./input";

const lines = input.split("\n");

let result = 0;

lines.forEach((line) => {
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

  result += Number(`${largest}${secondLargest}`);
});

console.log("result is:", result);
