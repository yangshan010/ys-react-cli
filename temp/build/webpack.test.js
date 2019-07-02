const Visualizer = require("webpack-visualizer-plugin");
const { smart } = require("webpack-merge");
const BuildConfig = require("./webpack.build");
const UglifyJs = require("uglifyjs-webpack-plugin");
const UglifyCss = require("optimize-css-assets-webpack-plugin");
const PostcssParser = require("postcss-safe-parser");
module.exports = smart(BuildConfig, {
  //   plugins: [new Visualizer()], // 用于分析 bundle.js 的依赖关系
  optimization: {
    splitChunks: {
      name: "vendors",
      chunks: "initial",
      cacheGroups: {
        common: {
          // 普通的 自己写的代码
          chunks: "initial", // 刚开始
          minSize: 0, // 大于0kb
          minChunks: 2 // 引用超过2次
        },
        vendor: {
          // 第三方的模块
          priority: 1, // 权重 先抽离，不然的话，就会从走common，把第三方的包也抽离在里面 。
          test: /node_modules/, // 把node_modules中的东西抽离出来
          chunks: "initial", // 从什么时候开始 从最初的地方 还有异步的，这里暂时没讲
          minSize: 0
        }
      }
    },
    // splitChunks: {
    //   // 这里设置name的话，output也要设置chunksFilename
    //   name: "vendors",
    //   chunks: "initial"
    // },
    minimizer: [
      new UglifyJs({
        parallel: true, //使用多进程来进行处理
        sourceMap: true,
        uglifyOptions: {
          compress: {
            // warnings: false
          },
          output: {
            comments: false
          }
        }
      }),
      new UglifyCss({
        cssProcessorOptions: {
          //?
          parser: PostcssParser,
          discardComments: { removeAll: true },
          safe: true
        }
      })
    ]
  }
});
