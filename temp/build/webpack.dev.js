const webpack = require("webpack");
const { smart } = require("webpack-merge");
const webpackCommonConfig = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { setTitle } = require("./projectConfig");
const devServer = require("./devServerConfig");
console.log("123123");
console.log(process.env.BUILD_ENV);
module.exports = smart(webpackCommonConfig, {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["css-loader", "less-loader", "postcss-loader"]
      },
      {
        test: /\.css$/,
        use: ["css-loader", "postcss-loader"]
      }
    ]
  },
  devServer: devServer,
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: "./template/index.html",
      title: setTitle,
      filename: "index.html"
    })
  ]
});
