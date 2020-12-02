import { readFileSync } from "fs";

const data = readFileSync("day01.txt", { encoding: "utf8" })
  .split("\n")
  .map((n) => Number(n));

function step1(data) {
  let second = 0;
  let first = data.find((i) => {
    second = data.find((j) => i + j === 2020);
    return second;
  });
  return first * second;
}

function step2(data) {
  let second = 0;
  let third = 0;
  let first = data.find((i) => {
    second = data.find((j) => {
      third = data.find((k) => i + j + k === 2020);
      return third;
    });
    return second;
  });
  return first * second * third;
}

console.log("The answer for part one is:", step1(data));
console.log("The answer for part two is:", step2(data));
