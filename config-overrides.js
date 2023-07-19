const webpack = require("webpack");

module.exports = function override(config, env) {
	config.resolve = {
		extensions: [".js", ".jsx", ".ts", ".tsx", ".css"],
		fallback: {
			"process/browser": require.resolve("process/browser"),
			fs: false,
			module: false,
			tty: false,
			crypto: false,
			perf_hooks: false,
			vm: false,
			v8: false,
		},
	};
	// config.plugins = config.plugins.concat([
	// 	new webpack.DefinePlugin({
	// 		"process.env.NODE_ENV": JSON.stringify(
	// 			process.env.NODE_ENV || "production"
	// 		),
	// 	}),
	// ]);
	return config;
};
