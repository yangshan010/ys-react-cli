#!/usr/bin/env node

// 当前目录为空，如果当前目录的名称和project-name一样，则直接在当前目录下创建工程，否则，在当前目录下创建以project-name作为名称的目录作为工程的根目录
// 当前目录不为空，如果目录中不存在与project-name同名的目录，则创建以project-name作为名称的目录作为工程的根目录，否则提示项目已经存在，结束命令执行。

const program = require("commander");
const path = require("path");

console.log(
  "path.parse(context.target).dir",
  path.parse("hello-cli/.download-temp").dir
);
const fs = require("fs");
const glob = require("glob");
const download = require("../lib/download");
const inquirer = require("inquirer");
const latestVersion = require("latest-version");
const generator = require("../lib/generator.js");
program.usage("<project-name>").parse(process.argv);

let projectName = program.args[0];

if (!projectName) {
  // project-name 必填
  // 相当于执行命令的--help选项，显示help信息，这是commander内置的一个命令选项
  // program.help();
  projectName = "dev-project";
}

// 获取当前文件夹 有哪些文件
const list = glob.sync("*");
let next = undefined;
// console.log("process.cwd()", process.cwd());
// console.log("__dirname", __dirname);
// console.log("path.basename(process.cwd())", path.basename(process.cwd()));
// console.log("list");

let rootName = path.basename(process.cwd());

// console.log("rootName", rootName);
// console.log("projectName", projectName);
// if (list.length) {
//   // 如果当前目录不为空
//   if (list.indexOf(projectName) >= 0) {
//     console.log(`项目${projectName}已经存在`);
//     return;
//   }
//   next = Promise.resolve(projectName);
// } else if (rootName === projectName) {
//   next = inquirer
//     .prompt([
//       {
//         name: "buildInCurrent",
//         message:
//           "当前目录为空，且目录名称和项目名称相同，是否直接在当前目录下创建新项目？",
//         type: "confirm",
//         default: true
//       }
//     ])
//     .then(answer => {
//       console.log("answer.buildInCurrent ", answer.buildInCurrent);
//       return Promise.resolve(answer.buildInCurrent ? "." : projectName);
//     });
// } else {
//   next = Promise.resolve(projectName);
// }
next = inquirer
  .prompt([
    {
      name: "buildInCurrent",
      message: "文件目录名称",
      default: "dev-project"
    }
  ])
  .then(answer => {
    if (list.length) {
      if (list.indexOf(answer.buildInCurrent) >= 0) {
        console.log(`项目${projectName}已经存在`);
        return;
      }
      console.log("answer", answer.buildInCurrent);
    }
    return Promise.resolve(answer.buildInCurrent);
  });
next && go;
function go() {
  // console.log(path.resolve(process.cwd(), path.join(".", rootName)));
  //
  next
    .then(projectRoot => {
      // console.log("next===>回调", projectRoot);
      if (projectRoot !== ".") {
        // console.log("是否相等");
        fs.mkdirSync(projectRoot);
      }

      return download(projectRoot)
        .then(target => {
          console.log("成功", target);
          return {
            name: projectRoot,
            root: projectRoot,
            target
          };
        })
        .catch(err => {
          console.log(err);
        });
    })
    .then(context => {
      return inquirer
        .prompt([
          {
            name: "projectName",
            message: "项目的名称",
            default: context.name
          },
          {
            name: "projectVersion",
            message: "项目的版本号",
            default: "1.0.0"
          },
          {
            name: "projectDescription",
            message: "项目的简介",
            default: `A project named ${context.name}`
          }
        ])
        .then(answers => {
          return latestVersion("macaw-ui").then(version => {
            answers.supportUiVersion = version;
            return {
              ...context,
              metadata: {
                ...answers
              }
            };
          });
          // .catch(err => {
          //   return Promise.reject(err);
          // });
        });
    })
    .then(context => {
      console.log(context);
      console.log(
        "path.parse(context.target).dir",
        path.parse(context.target).dir
      );
      return generator(
        context.metadata,
        context.target,
        path.parse(context.target).dir
      );
    })
    .then(contenxt => {
      console.log("创建成功");
    })
    .catch(err => {
      console.log("失败了", err);
    });
}

go();
