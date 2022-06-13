import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'esm'
    },
    plugins: [
        resolve({
            extensions: [".js"],
        }), // for importing modules installed with NPM.
        babel({
            presets: ["@babel/preset-react"],
        }), // for transpiling JSX code into valid JavaScript code.
        commonjs(), //  so that Rollup can import code in CommonJS module format.
    ],
};
