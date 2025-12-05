import { input } from "./input";

const [ranges] = input.split("\n\n").map((item) => item.split("\n"));

let sortedRanges = ranges
  .map((range) => range.split("-").map(Number))
  .sort((prev, next) => prev[0] - next[0]);

let i = 0;
while (i < sortedRanges.length) {
  const [from, to] = sortedRanges[i];
  let [prevFrom, prevTo] = sortedRanges[i - 1];

  if (from >= prevFrom && from <= prevTo) {
    prevTo = to < prevTo ? to : prevTo;
    sortedRanges = [...sortedRanges.slice(0, i), ...sortedRanges.slice(i + 1)];
  } else {
    i++;
  }
}

const result = sortedRanges.reduce(
  (acc, range) => acc + range[1] - range[0] + 1,
  0
);

console.log("result is:", result);
