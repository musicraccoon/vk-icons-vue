import fs from "node:fs";
import { parseSync, stringify } from "svgson";
import { optimizeSvg, recursiveParseSvg } from "./utils.js";

export default function template({ name, componentName, size, path }) {
  const svg = parseSync(optimizeSvg(fs.readFileSync(path, "utf-8"), name));
  svg.attributes.style = "background-color: #fff; border-radius: 2px";

  const content = recursiveParseSvg(svg);
  const width = svg.attributes.width || size;
  const height = svg.attributes.height || size;

  const base64 = Buffer.from(stringify(svg)).toString("base64");

  let viewBox = svg.attributes.viewBox;

  if (viewBox === undefined) {
    viewBox = `0 0 ${width} ${height}`;
  }

  return `
import createIcon from '../createIcon';

/**
 * @preview ![img](data:image/svg+xml;base64,${base64})
 */
const ${componentName} = createIcon({
  name: "${name}",
  content: ${JSON.stringify(content)},
  width: ${width},
  height: ${height},
  viewBox: "${viewBox}"
});

export default ${componentName};
`;
}
