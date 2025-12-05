import { input } from "./input";

const [ranges, ids] = input.split("\n\n").map((item) => item.split("\n"));
let result = 0;

ids.forEach((stringId) => {
  const id = Number(stringId);

  for (let i = 0; i < ranges.length; i++) {
    const [from, to] = ranges[i].split("-").map(Number);

    if (id >= from && id <= to) {
      result++;
      break;
    }
  }
});

console.log("result is:", result);
