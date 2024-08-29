import fs from "node:fs";
import path from "node:path";
import { globSync } from "glob";
import template from "./template.js";
import { snakeToPascal } from "./utils.js";

const PATH_ICONS = path.join(path.resolve("", "src/icons"));

async function run() {
  const icons = getIcons();

  generateIcons(icons);
  generateExportFile(icons);
}

function getIcons() {
  const paths = globSync(
    "node_modules/@vkontakte/icons/src/svg/**/*.svg"
  ).sort();

  return paths.map((el) => {
    const name = path.basename(el, ".svg");
    const size = Number(name.split("_").slice(-1)[0]);
    const componentName = `Icon${size}${snakeToPascal(name.split("_").slice(0, -1).join("_"))}`;

    return { name, componentName, size, path: el };
  });
}

function generateIcons(icons) {
  icons.map((icon) => {
    const location = path.join(PATH_ICONS, `${icon.name}.ts`);
    const output = template(icon);
    fs.writeFileSync(location, output, "utf-8");
  });
  console.log(`Success generate: ${icons.length} icons.`);
}

async function generateExportFile(icons) {
  fs.writeFileSync(path.join(PATH_ICONS, "index.ts"), "", "utf-8");

  icons.map((el) => {
    const output = `export { default as ${el.componentName} } from './${el.name}';\n`;
    fs.appendFileSync(path.join(PATH_ICONS, "index.ts"), output, "utf-8");
  });
}

try {
  run();
} catch (err) {
  console.log(err);
}
