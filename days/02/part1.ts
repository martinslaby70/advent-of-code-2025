import { input } from "./input";

let result = 0;

input.forEach((range) => {
  const [start, end] = range.split("-").map(Number);

  for (let i = start; i <= end; i++) {
    const productId = i.toFixed();

    const firstHalf = productId.slice(0, productId.length / 2);
    const secondHalf = productId.slice(productId.length / 2);

    if (firstHalf === secondHalf) {
      result += Number(productId);
    }
  }
});

console.log("result is:", result);
