import esbuild from "rollup-plugin-esbuild";
import { dts } from "rollup-plugin-dts";
import { SourceMap } from "module";

/**
 * @type {import('rollup').RollupOptions}
 */
const config = [
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.d.ts",
    },
    plugins: [
      dts({
        compilerOptions: {
          preserveSymlinks: false,
        },
      }),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      preserveModules: true,
      // file: "dist/index.js",
    },
    external: ["vue"],
    plugins: [
      esbuild({
        minify: true,
      }),
    ],
  },
];

export default config;
