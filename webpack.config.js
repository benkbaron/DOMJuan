module.exports = {
  entry: "./demo/demo.js",
  output: {
    path: __dirname,
    filename: "./lib/bundle.js"
	},
	devtool: "source-map"
};
