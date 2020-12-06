import { readFileSync } from "fs";

const data = readFileSync("day05.txt", { encoding: "utf8" })
  .split("\n")
  .slice(0, -1); // Remove the last empty line from the set.

const binaryize = (data) =>
  data.map((row) => parseInt(row.replace(/B|R/g, "1").replace(/F|L/g, "0"), 2));

const highestSeat = binaryize(data).reduce((p, c) => (p > c ? p : c));

const seatNumber =
  binaryize(data)
    .sort((a, b) => (a > b ? 1 : -1))
    .filter((val, idx, arr) => val != arr[idx - 1] + 1)[1] - 1;

console.log("The highest seat number for part 1 is:", highestSeat);

console.log("The seat number for part 2 is:", seatNumber);
