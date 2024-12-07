import fs from "fs/promises";

async function readFile(path) {
  const file = await fs.readFile(path, { encoding: "utf-8" });

  return JSON.parse(file);
}

async function writeFile(path, data) {
  await fs.writeFile(path, JSON.stringify(data));
}

export { readFile, writeFile };
