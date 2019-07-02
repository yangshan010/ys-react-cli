const fs = require("fs-extra");
const path = require("path");
// console.log("__dirname", __dirname);
// console.log("tempPath", path.join(__dirname, "../temp"));
// console.log("process.cwd()", process.cwd());
function makeDir(dirpath) {
  if (!fs.existsSync(dirpath)) {
    var pathtmp;
    dirpath.split("/").forEach(function(dirname) {
      if (pathtmp) {
        pathtmp = path.join(pathtmp, dirname);
      } else {
        //如果在linux系统中，第一个dirname的值为空，所以赋值为"/"
        if (dirname) {
          pathtmp = dirname;
        } else {
          pathtmp = "/";
        }
      }
      if (!fs.existsSync(pathtmp)) {
        if (!fs.mkdirSync(pathtmp)) {
          return false;
        }
      }
    });
  } else {
    deleteFolderFiles(dirpath);
  }
  return true;
}
module.exports = async function(target) {
  //   console.log("target", target);
  //   console.log("__dirname", __dirname);
  //   console.log("process.cwd()", process.cwd());
  target = path.join(target, "temp");
  console.log("target", target);
  const src = path.join(__dirname, "../temp");
  const destination = path.join(process.cwd(), target);
  // fs.mkdirSync(process.cwd)
  makeDir(destination);
  //   console.log("src", src);
  //   console.log("destination", destination);
  await fs.copy(src, destination);
  return Promise.resolve(target);
};
