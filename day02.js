import { readFileSync } from "fs";

const data = readFileSync("day02.txt", { encoding: "utf8" })
  .split("\n")
  .slice(0, -1) // Remove the last empty line from the set.
  .map((line) => {
    const parts = line.match(/(.*)\s(\w):\s(.*)/);
    const limits = parts[1].split("-");
    return {
      limits: {
        low: limits[0],
        high: limits[1],
      },
      letter: parts[2],
      password: parts[3],
    };
  });

function step1(data) {
  return data.filter((set) => {
    let countOfLetter = 0;
    for (let i = 0; i < set.password.length; i++) {
      if (set.password[i] === set.letter) {
        countOfLetter += 1;
      }
    }
    return countOfLetter >= set.limits.low && countOfLetter <= set.limits.high;
  }).length;
}

function step2(data) {
  return data.filter(
    (set) =>
      (set.password[set.limits.low - 1] === set.letter) ^
      (set.password[set.limits.high - 1] === set.letter)
  ).length;
}

console.log("The answer to step one is:", step1(data));
console.log("The answer to step one is:", step2(data));
