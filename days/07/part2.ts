import { input } from "./input";

let result = 0;
const rows = input.split("\n").map((row) => row.split(""));

let beamsIndexes = new Map<number, number>();
beamsIndexes.set(rows[0].indexOf("S"), 1);

for (let i = 1; i < rows.length; i++) {
  const row = rows[i];

  for (let j = 0; j < row.length; j++) {
    const isSplitter = row[j] === "^";

    if (isSplitter && beamsIndexes.has(j)) {
      const initialWeight = beamsIndexes.get(j) ?? 0;

      beamsIndexes.delete(j);

      const leftWeight = beamsIndexes.get(j - 1) ?? 0;
      const rightWeight = beamsIndexes.get(j + 1) ?? 0;

      beamsIndexes.set(j + 1, rightWeight + initialWeight);
      beamsIndexes.set(j - 1, leftWeight + initialWeight);
    }
  }
}

beamsIndexes.forEach((weight) => (result += weight));

console.log("result is:", result);
