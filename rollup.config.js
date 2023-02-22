import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import scss from "rollup-plugin-scss";
import ts from "typescript";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import dts from "rollup-plugin-dts";
import json from "@rollup/plugin-json";
import external from "rollup-plugin-peer-deps-external";
import packageJson from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    plugins: [
      resolve({ extensions: [".js", ".jsx", ".ts", ".tsx"] }),
      commonjs(),
      json(),
      scss({
        output: false,
        include: ["/**/*.css", "/**/*.scss", "/**/*.sass"],
        failOnError: true,
        verbose: true,
      }), // will output compiled styles to output.css
      external(),
      typescript({
        typescript: ts,
        tsconfig: "./tsconfig.build.json",
        declaration: true,
        declarationDir: "types",
        sourceMap: true,
        exclude: [
          "**/*.spec.ts",
          "**/*.test.ts",
          "**/*.stories.ts",
          "**/*.spec.tsx",
          "**/*.test.tsx",
          "**/*.stories.tsx",
          "node_modules",
          "dist",
        ],
      }),
      postcss({
        plugins: [autoprefixer()],
        autoModules: true,
        modules: {
          generateScopedName: (name, filename) =>
            `${import("path")
              .basename(filename, ".css")
              .replace(".module.scss", "")}_${name}`,
        },
        inject: false,
        extract: true,
        minimize: true,
      }),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [
      postcss({
        plugins: [autoprefixer()],
        extract: true,
        minimize: true,
      }),
      dts(),
      resolve({ extensions: [".ts", ".tsx"] }),
    ],
  },
];
