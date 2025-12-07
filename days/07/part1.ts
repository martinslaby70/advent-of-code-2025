import { input } from "./input";

let result = 0;
const rows = input.split("\n").map((row) => row.split(""));

let beamsIndexes = new Set<number>([rows[0].indexOf("S")]);

for (let i = 1; i < rows.length; i++) {
  const row = rows[i];

  for (let j = 0; j < row.length; j++) {
    const isSplitter = row[j] === "^";

    if (isSplitter && beamsIndexes.has(j)) {
      result++;

      beamsIndexes.delete(j);
      beamsIndexes.add(j - 1);
      beamsIndexes.add(j + 1);
    }
  }
}

console.log("result is:", result);
