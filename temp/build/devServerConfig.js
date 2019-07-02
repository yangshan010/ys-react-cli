const path = require("path");
const { publicPath, port } = require("./projectConfig");
const host = require("./getLocallIp");
module.exports = {
  contentBase: "./dist", // ?
  port,
  publicPath,
  compress: true, // 启用gizp 压缩
  host,
  hot: true,
  // openPage:publicPath.splice(1) // ?
  inline: true, //?
  quiet: true, //  webpack的错误信息 不会显示在控制台
  clientLogLevel: "none",
  open: true,
  overlay: {
    // 错误信息 直接显示在页面上
    warnings: true,
    errors: true
  }
  // proxy: [
  //   {
  //     //要代理的地址 此规则用！取反
  //     context: [`!${publicPath}**`],
  //     //要代理的目标
  //     target: "https://platform-dev.mobilemd.cn",
  //     //是否更改源
  //     changeOrigin: true,
  //     //路径重写
  //     pathRewrite: {
  //       "^/$": ""
  //     },
  //     //cookie域名重写
  //     cookieDomainRewrite: host
  //   }
  // ]
};
