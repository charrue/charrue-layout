const { existsSync, readFileSync, writeFileSync, unlinkSync, mkdirSync } = require("fs");
const { resolve, dirname } = require("path");

const sourceFilepath = resolve(__dirname, "./index.css");

if (!existsSync(sourceFilepath)) {
  console.warn(`${sourceFilepath} does not exist.`);
  process.exit(1);
}

const sourceContent = readFileSync(sourceFilepath, { encoding: "utf-8" });
const targetPaths = [
  resolve(__dirname, "../packages/layout/dist/index.css"),
  resolve(__dirname, "../packages/layout-next/dist/index.css"),
];

targetPaths.forEach((filepath) => {
  mkdirSync(dirname(filepath), { recursive: true });
  console.log(`Writing ${filepath}...`);
  writeFileSync(filepath, sourceContent, { encoding: "utf-8" });
});

unlinkSync(sourceFilepath);
