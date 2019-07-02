const Metalsmith = require("metalsmith");
const Handlebars = require("handlebars");
const rm = require("rimraf").sync;
module.exports = function(metadata = {}, src, dest = ".") {
  if (!src) {
    return Promise.reject(new Error(`无效的source:${src}`));
  }
  return new Promise((resolve, reject) => {
    Metalsmith(process.cwd())
      .metadata(metadata)
      .clean(false)
      .source(src)
      .destination(dest)
      .use((files, metalsmith, done) => {
        const meta = metalsmith.metadata();
        Object.keys(files)
          .filter(x => x.includes("package.json"))
          .forEach(fileName => {
            const t = files[fileName].contents.toString();
            files[fileName].contents = Buffer.from(Handlebars.compile(t)(meta));
          });

        done();
      })
      .build(err => {
        rm(src);
        console.log("err==genertor=>", err);
        err ? reject(err) : resolve();
      });
  });
};
