/**
 * TODO. Генератор иконок вынести в scripts
 * TODO. Шаблон вынести в отдельный файл
 */

import path from "node:path";
import fs from "node:fs";
import { glob } from "glob";
import svgson from "svgson";
import * as prettier from "prettier";

const template = ({ componentName, children }) => {
  return `
import createIcon from '../createIcon';

const ${componentName} = createIcon({children: ${JSON.stringify(children)}});

export default ${componentName};
`;
};

const PATH_ICONS = path.join(path.resolve(process.cwd(), "src/icons"));

// const readSvg = (fileName, directory) => fs.readFileSync(path.join(directory, fileName), "utf-8");

const paths = await glob("node_modules/@vkontakte/icons/src/svg/**/*.svg");

const content = fs.readFileSync(paths[0], "UTF-8");
const svg = svgson.parseSync(content);

const output = await prettier.format(
  template({
    componentName: "test",
    children: svg.children,
  }),
  {
    parser: "typescript",
  }
);

fs.writeFileSync(path.join(PATH_ICONS, "test.ts"), output);
// console.log(path.resolve("./"));
