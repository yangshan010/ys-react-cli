const CleanWebpack = require("clean-webpack-plugin");
const BaseConfig = require("./webpack.common");
const { smart } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { setTitle } = require("./projectConfig");
const CssUglify = require("mini-css-extract-plugin");
const path = require("path");
console.log(path.resolve("./template/index.html"));
module.exports = smart(BaseConfig, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [CssUglify.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.less$/,
        use: [CssUglify.loader, "css-loader", "less-loader", "postcss-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpack(),
    new CssUglify({
      filename: "css/main.css"
    }),
    new HtmlWebpackPlugin({
      filename: "index2.html",
      template: path.resolve("./template/index.html"),
      title: setTitle,
      minify: {
        removeAttributeQuotes: true, // 删除双引号
        collapseWhitespace: true // 一行
      }
    })
  ]
});
