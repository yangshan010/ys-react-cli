const Metalsmith = require("metalsmith");
const Handlebars = require("handlebars");
const rm = require("rimraf").sync;
module.exports = function(metadata = {}, src, dest = ".") {
  if (!src) {
    return Promise.reject(new Error(`无效的source:${src}`));
  }
  return new Promise((resolve, reject) => {
    // console.log("process.cwd()", process.cwd());
    // console.log("src", src);
    // console.log("dest", dest);
    // console.log("metadata", metadata);
    Metalsmith(process.cwd()) // 传入当前的路径
      .metadata(metadata) // 要替换的数据
      .clean(false) // 替换完temp是否清除
      .source(src) // 源文件的路径 要替换的temp
      .destination(dest) // 替换后的输出路径
      .use((files, metalsmith, done) => {
        // console.log("files", files);
        const meta = metalsmith.metadata();
        // console.log("meta", meta);
        Object.keys(files)
          .filter(x => {
            return (
              x.includes("package.json") || x.includes("build/projectConfig.js")
            );
          })
          .forEach(fileName => {
            // t 是当前的文件内容
            const t = files[fileName].contents.toString();
            // console.log("t,", t);
            // console.log("==============>");
            files[fileName].contents = Buffer.from(Handlebars.compile(t)(meta));
            // console.log("Handlebars", Handlebars.compile(t)(meta));
          });

        done();
      })
      .build(err => {
        rm(src);
        // console.log("err==genertor=>", err);
        err ? reject(err) : resolve();
      });
  });
};
