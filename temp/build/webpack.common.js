const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJs = require("uglifyjs-webpack-plugin");
const UglifyCss = require("optimize-css-assets-webpack-plugin");
const CleanPlugin = require("clean-webpack-plugin");
const host = require("./getLocallIp");
const FriendlyErrors = require("friendly-errors-webpack-plugin");
const { port, publicPath } = require("./projectConfig");
console.log(path.resolve("dist"));
module.exports = {
  mode: "development",
  // optimization: {
  //   minimizer: [new UglifyJs({}), new UglifyCss({})]
  // },
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve("dist"),
    chunkFilename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: "html-withimg-loader"
      },
      {
        test: /\.(png|jpeg)$/,
        use: "url-loader"
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react",
              [
                "@babel/preset-env",
                {
                  debug: true,
                  useBuiltIns: "usage",
                  targets: { browsers: ["> 1%"] }
                }
              ]
            ],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  corejs: 2 // 参考官方文档
                }
              ]
            ]
          }
        },
        include: [path.resolve("./src")],
        exclude: /nodu_modules/
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss", "css", "less"],
    alias: {}
  },
  resolveLoader: {
    moduleExtensions: ["-loader"]
  },

  plugins: [
    new CleanPlugin(),
    new FriendlyErrors({
      compilationSuccessInfo: {
        messages: [`编译成功 代码运行在 ${host}:${port}${publicPath}`]
      }
    })
  ]
};
