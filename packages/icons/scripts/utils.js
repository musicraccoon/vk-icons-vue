import { optimize } from "svgo";

export function snakeToPascal(value) {
  return value
    .split("_")
    .map((el) => el[0].toUpperCase() + el.slice(1))
    .join("");
}

/**
 *
 * @param {string} svg
 * @param {string} prefix
 * @returns {string}
 */
export function optimizeSvg(svg, prefix) {
  return optimize(svg, {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      {
        name: "prefixIds",
        params: {
          delim: "_",
          prefix: () => prefix,
        },
      },
    ],
  }).data;
}

export function recursiveParseSvg(svg) {
  function parse(children) {
    return children.map((el) => ({
      name: el.name,
      attributes: el.attributes,
      children: parse(el.children),
    }));
  }

  return parse(svg.children);
}
