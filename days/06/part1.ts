import { input } from "./input";

let result = 0;
const rows = input.split("\n").map((row) => row.trim().split(/\s+/));

const solveOperation = (values: string[], operation: string) =>
  values.reduce((acc, curr, next) => {
    const num = Number(curr);

    if (acc === 0) return num;

    if (operation === "+") return acc + num;
    if (operation === "*") return acc * num;

    return num;
  }, 0);

for (let i = 0; i < rows[0].length; i++) {
  const operation = rows[rows.length - 1][i];
  const numbers: string[] = [];

  for (let j = 0; j < rows.length - 1; j++) {
    numbers.push(rows[j][i]);
  }

  result += solveOperation(numbers, operation);
}

console.log("result is:", result);
