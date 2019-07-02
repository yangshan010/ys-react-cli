const host = require("./getLocallIp");
const config = {
  host: host,
  port: "{{port}}",
  publicPath: "/",
  siteTitle: "杨山的测试项目"
};
module.exports = config;
