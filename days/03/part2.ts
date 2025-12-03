import { input } from "./input";

const lines = input.split("\n");

let result = 0;

lines.forEach((line) => {
  let voltages: number[] = [];
  let lastPushedIndex = 0;

  for (let j = 11; j >= 0; j--) {
    let highestVoltage = 0;
    let highestVoltageIndex = 0;

    for (let i = lastPushedIndex; i < line.length - j; i++) {
      const voltage = Number(line[i]);

      if (voltage > highestVoltage) {
        highestVoltage = voltage;
        highestVoltageIndex = i + 1;
      }
    }

    lastPushedIndex = highestVoltageIndex;
    voltages.push(highestVoltage);
  }

  result += Number(voltages.join(""));
});

console.log("result is:", result);
