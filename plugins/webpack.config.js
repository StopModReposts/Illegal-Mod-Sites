const path = require("path");

module.exports = {
  entry: {
    contentScript: "./src/contentScript.ts",
    background: "./src/background.ts",
    pageScript: "./src/pageScript.ts",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "out"),
  },
};
