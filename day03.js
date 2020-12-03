import { readFileSync } from "fs";

const data = readFileSync("day03.txt", { encoding: "utf8" })
  .split("\n")
  .slice(0, -1) // Remove the last empty line from the set.
  .map((row) => row.split(""));

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

function countTreeHits(slopes) {
  const treeHits = [];
  slopes.forEach((slope) => {
    let run = slope[0];
    let drop = slope[1];
    let posX = run;
    let treeCount = 0;
    let rowLength = data[0].length - 1;

    for (let row = drop; row < data.length; row += drop) {
      if (data[row][posX] === "#") {
        treeCount += 1;
      }
      if (posX + run > rowLength) {
        const startingDelta = (posX + run) % rowLength;
        posX = startingDelta - 1; // Put extra steps onto the next row
      } else {
        posX += run;
      }
    }
    treeHits.push(treeCount);
  });
  return treeHits;
}

console.log(`For part1 we would hit ${countTreeHits([[3, 1]])} trees`);
console.log(
  `For part2 we would hit ${countTreeHits(slopes).reduce((prev, current) =>
    prev ? prev * current : prev
  )} trees`
);
