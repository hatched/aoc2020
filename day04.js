import { readFileSync } from "fs";

const rawData = readFileSync("day04.txt", { encoding: "utf8" }).split("\n");
const records = [];
let record = {};

rawData.forEach((row) => {
  if (row.length === 0) {
    // If the row is empty then store and reset the record for the next one.
    records.push(record);
    record = {};
    return;
  }
  row.split(" ").forEach((item) => {
    const parts = item.split(":");
    record[parts[0]] = parts[1];
  });
});

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const validators = {
  byr: (val) => /^\d{4}$/.test(val) && val >= 1920 && val <= 2002,
  iyr: (val) => /^\d{4}$/.test(val) && val >= 2010 && val <= 2020,
  eyr: (val) => /^\d{4}$/.test(val) && val >= 2020 && val <= 2030,
  hgt: (val) => {
    const parts = val.match(/(\d{2,3})(cm|in)/);
    if (!parts) {
      return false;
    } else if (parts[2] === "cm") {
      return parts[1] >= 150 && parts[1] <= 193;
    } else if (parts[2] === "in") {
      return parts[1] >= 59 && parts[1] <= 76;
    }
  },
  hcl: (val) => /^#[0-9a-f]{6}$/.test(val),
  ecl: (val) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(val),
  pid: (val) => /^\d{9}$/.test(val),
};

const collectValids = (records) =>
  records.filter(
    (passport) => !requiredFields.some((fields) => !passport[fields])
  );

const validate = (records) =>
  records.filter(
    (passport) =>
      !Object.entries(passport).some(([key, val]) => {
        if (key === "cid") {
          return false;
        }
        return !validators[key](val);
      })
  );

console.log(
  `There are ${collectValids(records).length} valid passports in step 1`,
  `and ${validate(collectValids(records)).length} in step 2`
);
