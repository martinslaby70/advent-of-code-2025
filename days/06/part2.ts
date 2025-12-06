import { input } from "./input";

let result = 0;

const data = input.split("\n");

let temporaryResult = 0;
let operator: string | undefined = undefined;

for (let i = 0; i <= data[0].length; i++) {
  const lastRowIndex = data.length - 1;
  const value = data
    .slice(0, lastRowIndex)
    .map((row) => row.charAt(i))
    .join("")
    .trim();

  const currentOperator = data[lastRowIndex].charAt(i);

  if (value === "") {
    result += temporaryResult;
    temporaryResult = 0;
    operator = undefined;
    continue;
  }

  if (operator === undefined) {
    operator = currentOperator;
    temporaryResult = Number(value);
    continue;
  }

  if (operator === "+") temporaryResult += Number(value);
  if (operator === "*") temporaryResult *= Number(value);
}

console.log("result is:", result);
