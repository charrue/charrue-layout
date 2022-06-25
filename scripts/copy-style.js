const fs = require("fs");
const path = require("path");

const sourceFilepath = path.resolve(__dirname, "./index.css");

if (!fs.existsSync(sourceFilepath)) {
  console.warn(`${sourceFilepath} does not exist.`);
  process.exit(1);
}

const sourceContent = fs.readFileSync(sourceFilepath, { encoding: "utf-8" });
const targetPaths = [
  path.resolve(__dirname, "../packages/layout/dist/index.css"),
  path.resolve(__dirname, "../packages/layout-next/dist/index.css"),
];

targetPaths.forEach((filepath) => {
  console.log(`Writing ${filepath}...`);
  fs.writeFileSync(filepath, sourceContent, { encoding: "utf-8" });
});

fs.unlinkSync(sourceFilepath);
