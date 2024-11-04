import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import livereload from "rollup-plugin-livereload";
import nodePolyfills from "rollup-plugin-polyfill-node";
import serve from "rollup-plugin-serve";

const dev = process.env.ROLLUP_WATCH;

export default {
  input: "src/index.ts",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    name: "app",
    sourcemap: true,
    globals: {
      "node:crypto": "crypto",
    },
  },
  plugins: [
    nodePolyfills(/* options */),
    resolve(),
    commonjs(),
    typescript(),
    dev &&
      serve({
        open: true,
        contentBase: ["dist", "."], // or ['public', '.'] if using a public folder
        host: "localhost",
        port: 10001,
      }),
    dev && livereload("dist"),
  ],
  external: ["tslib", "node:crypto"],
};
