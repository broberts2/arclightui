const typescript = require("rollup-plugin-ts");
//const folderInput = require("rollup-plugin-folder-input").folderInput;
const commonjs = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const json = require("@rollup/plugin-json");
const copy = require("rollup-plugin-copy");
const babel = require("@rollup/plugin-babel").babel;
const nodePolyfills = require("rollup-plugin-node-polyfills");
const postcss = require("rollup-plugin-postcss");
const packageJson = require("./package.json");
module.exports = [
	{
		input: ["src/components/index.ts"],
		output: [
			{
				file: packageJson.main,
				format: "cjs",
				//preserveModules: true,
				sourcemap: false,
				exports: "named",
			},
			// {
			// 	file: packageJson.module,
			// 	format: "esm",
			// 	sourcemap: false,
			// },
		],
		plugins: [
			//folderInput(),
			nodeResolve(),
			peerDepsExternal(),
			commonjs({
				transformMixedEsModules: true,
				strictRequires: "auto",
			}),
			postcss(),
			json(),
			nodePolyfills(),
			typescript(),
			//babel({ babelHelpers: "bundled" }),
			copy({
				targets: [
					{
						src: `package.json`,
						dest: `dist`,
					},
				],
			}),
		],
		external: ["react", "react-dom"],
	},
	// {
	// 	input: "dist/esm/types/index.d.ts",
	// 	output: [{ file: "dist/index.d.ts", format: "esm" }],
	// 	plugins: [dts.default(), nodePolyfills()],
	// },
];
